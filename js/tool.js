export function link(url) { location.href=url}


export async function Ajax (info){
    let { url, method, param, fSuccess } = info;
    if (param !== undefined && method === "GET") url += "?" + new URLSearchParams(param)
    if (method === "GET") method = { method, headers: { "Content-Type": "application/json" } }
    if (method === "POST" || method === "PUT" || method === "DELETE")
      method = {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(param),
      }
  
    try {
      //console.log(url,method)
      let resp = await fetch(url,method);
      if (!resp.ok) throw { status: resp.status, msg: resp.statusText };
      let respJson = await resp.json();
      fSuccess(respJson);
    } catch (e) {
      fSuccess({ code: e.status, msg: e.msg });
    }
  };