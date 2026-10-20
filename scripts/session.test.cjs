const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),ts=require('typescript'),axios=require('axios');
function setup({expired=false,refreshFails=false,refreshStatus=undefined}={}){
 let refreshCount=0,logoutCount=0;const state={accessToken:'old',refreshToken:'refresh',role:'ADMIN',login(a,r){this.accessToken=a;this.refreshToken=r;},logout(){logoutCount++;this.accessToken=null;this.refreshToken=null;}};
 const client=axios.create();const axiosFacade={...axios,create:()=>client,post:async()=>{refreshCount++;await new Promise(r=>setTimeout(r,15));if(refreshFails){if(refreshStatus)throw new axios.AxiosError('Refresh rejected','ERR_BAD_RESPONSE',undefined,undefined,{status:refreshStatus,data:{},headers:{}});throw new Error('Network unavailable');}return {data:{accessToken:'new',refreshToken:'refresh'}};}};
 const source=fs.readFileSync('src/api/axiosClient.ts','utf8').replace('import.meta.env.VITE_API_URL','undefined');
 const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
 const module={exports:{}};vm.runInNewContext(code,{module,exports:module.exports,require:(name)=>name==='axios'?axiosFacade:{useAuthStore:{getState:()=>state},decodeUserFromToken:t=>({exp:(expired&&t==='old'?Date.now()-60000:Date.now()+60000)/1000})},console,Promise,Date});
 let requests=[];client.defaults.adapter=async config=>{requests.push(config);return {data:{},status:200,statusText:'OK',headers:{},config};};
 return {client,state,requests,refreshCount:()=>refreshCount,logoutCount:()=>logoutCount};
}
test('explicit fresh token is preserved',async()=>{const x=setup();await x.client.get('/users/auth/id',{headers:{Authorization:'Bearer fresh'}});assert.equal(x.requests[0].headers.get('Authorization'),'Bearer fresh');});
test('uses stored token when none is explicit',async()=>{const x=setup();await x.client.get('/users');assert.equal(x.requests[0].headers.get('Authorization'),'Bearer old');});
test('public login strips stale bearer token',async()=>{const x=setup();await x.client.post('/auth/login',{}, {headers:{Authorization:'Bearer expired'}});assert.equal(x.requests[0].headers.has('Authorization'),false);});
test('concurrent expired-token requests share one refresh',async()=>{const x=setup({expired:true});await Promise.all([x.client.get('/users'),x.client.get('/roles'),x.client.get('/permissions')]);assert.equal(x.refreshCount(),1);assert.ok(x.requests.every(r=>r.headers.get('Authorization')==='Bearer new'));});

test('network failure during refresh preserves the session',async()=>{const x=setup({expired:true,refreshFails:true});await assert.rejects(x.client.get('/users'));assert.equal(x.logoutCount(),0);assert.equal(x.state.refreshToken,'refresh');assert.equal(x.requests.length,0);});
test('server failure during refresh preserves the session',async()=>{const x=setup({expired:true,refreshFails:true,refreshStatus:503});await assert.rejects(x.client.get('/users'));assert.equal(x.logoutCount(),0);assert.equal(x.state.accessToken,'old');});
test('authentication rejection during refresh clears the rejected session',async()=>{const x=setup({expired:true,refreshFails:true,refreshStatus:401});await assert.rejects(x.client.get('/users'));assert.equal(x.logoutCount(),1);assert.equal(x.state.refreshToken,null);});
test('403 never triggers a token refresh',async()=>{const x=setup();x.client.defaults.adapter=async config=>{throw new axios.AxiosError('Forbidden','ERR_BAD_REQUEST',config,{}, {status:403,data:{},headers:{},config});};await assert.rejects(x.client.get('/users'));assert.equal(x.refreshCount(),0);});
test('401 is retried once and cannot loop',async()=>{const x=setup();let calls=0;x.client.defaults.adapter=async config=>{calls++;throw new axios.AxiosError('Unauthorized','ERR_BAD_REQUEST',config,{}, {status:401,data:{},headers:{},config});};await assert.rejects(x.client.get('/users'));assert.equal(calls,2);assert.equal(x.refreshCount(),1);assert.equal(x.logoutCount(),0);assert.equal(x.state.accessToken,'new');});


test('late 401 from a previous account cannot clear the new session',async()=>{
 const x=setup();let release;const started=new Promise(resolve=>{release=resolve;});let rejectRequest;
 x.client.defaults.adapter=config=>{release();return new Promise((resolve,reject)=>{rejectRequest=()=>reject(new axios.AxiosError('Old account denied','ERR_BAD_REQUEST',config,{}, {status:401,data:{},headers:{},config}));});};
 const pending=x.client.get('/users');await started;x.state.accessToken='other-account-token';x.state.refreshToken='other-account-refresh';rejectRequest();await assert.rejects(pending);assert.equal(x.logoutCount(),0);assert.equal(x.refreshCount(),0);assert.equal(x.state.accessToken,'other-account-token');
});
