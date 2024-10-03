export function link(url) { location.href = url }


export async function Ajax(info) {
  let { url, method, param, fSuccess } = info, headers = { "Content-Type": "application/json" };
  if (method === "PATCH") headers = { "Content-Type": "multipart/form-data" }
  if (param !== undefined && method === "GET") url += "?" + new URLSearchParams(param)
  if (method === "GET") method = { method, headers }
  if (method === "POST" || method === "PUT" || method === "DELETE" || method === "PATCH") method = { method, headers, body: JSON.stringify(param) }

  try {
    //console.log(url,method)
    let resp = await fetch(url, method);
    if (!resp.ok) throw { status: resp.status, msg: resp.statusText };
    let respJson = await resp.json();
    fSuccess(respJson);
  } catch (e) {
    fSuccess({ code: e.status, msg: e.msg });
  }
};

export function salida() {
  let idtoken = localStorage.getItem("idtk")
  Ajax({
    url: "controller/login.php",
    method: "GET",
    param: { idtoken },
    fSuccess: (resp) => {
      if (resp.code !== 200) alert("Error al gestinar la salida del sistema")
      localStorage.clear()
      link("index.html")
    }
  })
}