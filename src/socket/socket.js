import { io } from "socket.io-client";
const createSocket=()=>{
return io("http://localhost:3000", {
  query: {
    token: localStorage.getItem("token"),
  },
})
}
;

export default createSocket;