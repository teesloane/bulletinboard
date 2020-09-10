// See: api.go/SwitchPoint
function getQS(qs) {
  fetch(`http://localhost:${window.PORT}/api?${qs}`);
}

export default { getQS };
