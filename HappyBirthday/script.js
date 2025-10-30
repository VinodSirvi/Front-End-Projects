document.addEventListener('DOMContentLoaded', () => {
    const surpriseBtn = document.getElementById('surpriseBtn');
    const birthdaySong = document.getElementById('birthdaySong');
    const content = document.querySelector('.content');
    const typedText = document.querySelector('.typed-text');
    const typedMessage = document.querySelector('.typed-message');
    let isPlaying = false;

    const text = "Happy Birthday Jiya !";
    const message = "Wishing you a day full of joy, laughter, and wonderful surprises!";
    
    function typeText(element, text, speed = 100, cursorClass = "typing") {
        let index = 0;
        element.classList.add(cursorClass);
        return new Promise(resolve => {
            function type() {
                if (index < text.length) {
                    element.textContent += text.charAt(index);
                    index++;
                    setTimeout(type, speed);
                } else {
                    // Remove cursor after typing
                    element.classList.remove(cursorClass);
                    resolve();
                }
            }
            type();
        });
    }

    function createConfetti() {
        const colors = ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7'];
        
        confetti({
            particleCount: 100,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 100,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });
    }

    async function startCelebration() {
        if (!isPlaying) {
            // Show the content with animation and hide the button
            content.classList.remove('hidden');
            surpriseBtn.classList.add('hidden');
            
            birthdaySong.play();
            isPlaying = true;

            // Start typing animations (faster)
            await typeText(typedText, text, 35);
            await typeText(typedMessage, message, 15);
            
            // Initial confetti burst
            createConfetti();
            
            // Periodic confetti bursts
            const confettiInterval = setInterval(createConfetti, 2000);
            
            // Listen for when the song ends
            birthdaySong.onended = () => {
                clearInterval(confettiInterval);
                isPlaying = false;
            };
            
            // Animate the button
            surpriseBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                surpriseBtn.style.transform = 'scale(1)';
            }, 200);
        } else {
            birthdaySong.pause();
            birthdaySong.currentTime = 0;
            isPlaying = false;
        }
    }

    surpriseBtn.addEventListener('click', startCelebration);
});
