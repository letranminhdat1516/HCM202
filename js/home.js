// Home page initialization
console.log('HCM202+ Home page loaded successfully!');

// Dynamic quotes rotation
const quotes = [
  "Không có gì quý hơn độc lập tự do",
  "Đạo đức là gốc, tài năng là ngọn",
  "Dân ta phải thật là dân ta",
  "Muốn cứu nước và giải phóng dân tộc, không có con đường nào khác con đường cách mạng vô sản",
  "Cần, kiệm, liêm, chính, chí công vô tư",
  "Học, học nữa, học mãi"
];

let currentQuoteIndex = 0;

function rotateQuote() {
  const quoteElement = document.getElementById('rotating-quote');
  if (quoteElement) {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    quoteElement.style.opacity = '0';
    
    setTimeout(() => {
      quoteElement.textContent = `"${quotes[currentQuoteIndex]}"`;
      quoteElement.style.opacity = '1';
    }, 300);
  }
}

// Start quote rotation after page load
window.addEventListener('DOMContentLoaded', () => {
  // Rotate quote every 4 seconds
  setInterval(rotateQuote, 4000);
  
  // Journey Map Interactions
  const journeyPoints = document.querySelectorAll('.journey-point');
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  // Click interaction for journey points
  journeyPoints.forEach((point, index) => {
    point.addEventListener('click', function() {
      // Remove active class from all
      journeyPoints.forEach(p => p.classList.remove('active'));
      timelineItems.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked point
      this.classList.add('active');
      
      // Highlight corresponding timeline item
      const pointNumber = this.querySelector('.point-marker').textContent;
      if (pointNumber !== '⭐') {
        const correspondingTimeline = document.querySelector(`[data-point="${pointNumber}"]`);
        if (correspondingTimeline) {
          correspondingTimeline.classList.add('active');
        }
      }
    });
  });
  
  // Click interaction for timeline items
  timelineItems.forEach(timeline => {
    timeline.addEventListener('click', function() {
      const pointNumber = this.dataset.point;
      const correspondingPoint = document.querySelector(`.point-${pointNumber}`);
      
      if (correspondingPoint) {
        // Remove active class from all
        journeyPoints.forEach(p => p.classList.remove('active'));
        timelineItems.forEach(t => t.classList.remove('active'));
        
        // Add active class
        correspondingPoint.classList.add('active');
        this.classList.add('active');
      }
    });
  });
});
