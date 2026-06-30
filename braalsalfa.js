function createRoom() {
            const adminInput = document.getElementById('adminName').value.trim();
            if (!adminInput) return alert("اكتب اسمك أولاً!");
            
            myName = adminInput;
            roomCode = Math.floor(1000 + Math.random() * 9000).toString();
            isAdmin = true;

            if (useFirebase) {
                db.ref('rooms/' + roomCode).set({
                    admin: myName,
                    status: "waiting",
                    players: [myName],
                    impostors: [],
                    category: "",
                    word: ""
                }).then(() => {
                    listenToRoom();
                    showScreen('lobbyScreen');
                    document.getElementById('startGameBtn').style.display = 'block';
                    document.getElementById('waitingMessage').style.display = 'none';
                });
            } else {
                // شيلنا أسماء التجربة.. الغرفة هتبدأ باسمك أنت وبس يا هندسة
                localRoom.admin = myName;
                localRoom.players = [myName]; 
                renderRoom(localRoom);
                showScreen('lobbyScreen');
                document.getElementById('startGameBtn').style.display = 'block';
                document.getElementById('waitingMessage').style.display = 'none';
            }
        }