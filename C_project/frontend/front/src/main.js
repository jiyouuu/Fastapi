const chatBox = document.getElementById('chat-box');
const recordBtn = document.getElementById('recordBtn');

let mediaRecorder, audioChunks = [];

function addMessage(text, sender) {
  const div = document.createElement('div');
  div.classList.add('message', sender);
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}



recordBtn.onclick = async () => {
  addMessage("🎧 (샘플 음성 전송 중...)", "bot");
  recordBtn.disabled = true;

  const formData = new FormData();
  const sampleFile = await fetch("divorce_test.mp3"); // ✅ 미리 넣어둔 샘플 파일
  const blob = await sampleFile.blob();
  formData.append("audio_file", blob, "divorce_test.mp3");

  const res = await fetch("http://127.0.0.1:8000/stt", {
    method: "POST",
    body: formData
  });
  const data = await res.json();
  addMessage(data.text, "user");





  // 예시 챗봇 응답
    const botResponse = "네, 그 부분은 위자료 청구 가능성이 있습니다!!!!!!!!!!!!!!!!!! 할렐루야 !";
    addMessage(botResponse, "bot");

    // ✅ TTS 요청
    const ttsForm = new FormData();
    ttsForm.append("text", botResponse);
    const ttsRes = await fetch("http://127.0.0.1:8000/tts", {
        method: "POST",
        body: ttsForm
    });

    const audioBlob = await ttsRes.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();

  recordBtn.disabled = false;
};



// recordBtn.onclick = async () => {
//   try {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     mediaRecorder = new MediaRecorder(stream);
//     audioChunks = [];

//     addMessage("🎧 (녹음 중...)", "bot");
//     recordBtn.disabled = true;
//     mediaRecorder.start();

//     mediaRecorder.ondataavailable = e => {
//       if (e.data.size > 0) audioChunks.push(e.data);
//     };

//     mediaRecorder.onstop = async () => {
//       addMessage("전송 중...", "bot");

//       // ✅ 올바른 필드 이름 (audio_file)
//       const blob = new Blob(audioChunks, { type: 'audio/webm' });
//       const formData = new FormData();
//       formData.append("audio_file", blob, "voice.webm");

//       const res = await fetch("http://127.0.0.1:8000/stt", {
//         method: "POST",
//         body: formData
//       });
//       const data = await res.json();

//       addMessage(data.text, "user");

//       // 예시 챗봇 응답
//       const botResponse = "네, 그 부분은 위자료 청구 가능성이 있습니다.";
//       addMessage(botResponse, "bot");

//       // ✅ TTS 요청
//       const ttsForm = new FormData();
//       ttsForm.append("text", botResponse);
//       const ttsRes = await fetch("http://127.0.0.1:8000/tts", {
//         method: "POST",
//         body: ttsForm
//       });

//       const audioBlob = await ttsRes.blob();
//       const audioUrl = URL.createObjectURL(audioBlob);
//       const audio = new Audio(audioUrl);
//       audio.play();

//       recordBtn.disabled = false;
//     };

//     setTimeout(() => {
//       if (mediaRecorder.state !== "inactive") mediaRecorder.stop();
//     }, 4000); // 4초 녹음
//   } catch (err) {
//     console.error("🎤 마이크 접근 오류:", err);
//     addMessage("⚠️ 마이크 권한을 허용해주세요.", "bot");
//   }
// };
