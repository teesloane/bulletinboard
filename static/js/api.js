// See: api.go/SwitchPoint
function getQS(qs) {
  fetch(`http://localhost:8080/api?${qs}`) // TODO - handle for different ports.
}

export default {getQS}