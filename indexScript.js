// document.addEventListener('DOMContentLoaded', (event) => {
//     let currentCaller = "";
//     const numberField = document.getElementById("numberField");
//     const buttons = document.querySelectorAll(".num-button");
//     const infoDiv = document.getElementById("info");
//     const callButton = document.querySelector("#call-button");
//     const infoButton = document.querySelector("#info-button");
//     const hangUpButton = document.querySelector("#hang-up");

//     buttons.forEach(button => {
//         button.addEventListener("click", () => {
//             numberField.value += button.textContent;
//         });
//     });

//     callButton.addEventListener("click", () => { callButtonClicked() });
//     hangUpButton.addEventListener("click", () => { endCall() });

//     document.querySelector("#accept-call-btn").addEventListener("click", acceptCall)
//     document.querySelector("#reject-call-btn").addEventListener("click", rejectCall)

//     class Controller {
//         constructor(ens) {
//             this.ens = ens
//         }
//         sendData(data) {
//             // define send data to native lang here
//             window.webkit.messageHandlers.buttonPressed.postMessage(JSON.stringify(data));
//         }
//         call(to) {
//             const callObject = {
//                 action: "call",
//                 body: { to: to }
//             }
//             this.sendData(callObject)
//         }
//         acceptCall(from) {
//             const request = {
//                 action: "accept-call",
//                 body: { from: from }
//             }
//             this.sendData(request)
//         }
//         rejectCall() {
//             const request = {
//                 action: "reject-call",
//                 body: { from: from }
//             }
//             this.sendData(request)
//         }
//         ring(to) {
//             // show ringing screen
//             infoDiv.textContent = `RINGING ${to}`
//         }
//         callStarted(_with) {
//             // show in call screen with name of caller
//             infoDiv.textContent = `IN CALL WITH ${_with}`
//         }
//         callEnded(_with) {
//             // end call logic
//             infoDiv.textContent = `CALL ENDED WITH ${_with}`
//         }
//         receivingCall(from) {
//             //receiving call logic
//             infoDiv.textContent = `RECEIVING CALL FROM ${receiver}`;
//             document.querySelector("#call-buttons").style.display = "inline-block"
//             currentCaller = receiver;
//         }
//         receiveData(_data) {
//             const data = JSON.parse(_data)
//             const action = data.action;
//             const body = data.body;
//             if (action === "ringing") {    // show calling screen
//                 if (!body.to) {
//                     return;
//                 }
//                 this.ring(to)
//             }
//             else if (action === "call-started") {
//                 const caller = body.from;
//                 this.callStarted(caller)
//             }
//             else if (action === "call-ended") {
//                 const caller = body.from;
//                 this.callEnded(caller)
//             }

//             // ALL ACTIONS FROM NATIVE
//             else if (action === "receiving-call") {
//                 if (!body.from) {
//                     return
//                 }
//                 const caller = body.from;
//                 this.receivingCall(caller)
//             }
//         }
//     }

//     const controller = new Controller("test.eth")

//     function callButtonClicked() {
//         if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.buttonPressed) {
//             controller.call(numberField.value)
//             console.log("Message sent to Swift with value: " + numberField.value);
//         } else {
//             console.log("Message handler not found");
//         }
//     }

//     function acceptCall() {
//         controller.acceptCall(currentCaller)
//         document.querySelector("#call-buttons").style.display = "none"
//     }

//     function rejectCall() {
//         controller.rejectCall(currentCaller)
//         document.querySelector("#call-buttons").style.display = "none"
//     }

//     function endCall() {
//         controller.callEnded()
//     }

//     function updateInfo(data) {
//         try {
//             infoDiv.textContent = data;

//         } catch (e) {
//             console.log(e)
//         }
//     }
// });
