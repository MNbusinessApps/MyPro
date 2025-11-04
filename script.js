// script.js
document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');
  const formSection = document.getElementById('formSection');
  const calcBtn = document.getElementById('calcBtn');
  const resetBtn = document.getElementById('resetBtn');
  const resultSection = document.getElementById('resultSection');
  const resultBox = document.getElementById('resultBox');
  const sendBtn = document.getElementById('sendBtn');
  const bookBtn = document.getElementById('bookBtn');
  const emailSection = document.getElementById('emailSection');
  const emailForm = document.getElementById('emailForm');
  const protectionForm = document.getElementById('protectionForm');

  // Navigation functions
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  // Show/hide sections
  const showSection = (sectionId) => {
    const sections = ['formSection', 'resultSection', 'emailSection'];
    sections.forEach(id => {
      if (id === sectionId) {
        document.getElementById(id).style.display = 'block';
      } else {
        document.getElementById(id).style.display = 'none';
      }
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate exposure
  const calculateExposure = (formData) => {
    const homeValue = parseFloat(formData.homeValue) || 0;
    const vehicleValue = parseFloat(formData.vehicleValue) || 0;
    const savingsValue = parseFloat(formData.savingsValue) || 0;
    const incomeValue = parseFloat(formData.incomeValue) || 0;
    
    // Total exposure = home + vehicle + savings + (income × 1 year)
    const totalExposure = homeValue + vehicleValue + savingsValue + incomeValue;
    return totalExposure;
  };

  // Get recommendation based on exposure
  const getRecommendation = (exposure) => {
    if (exposure <= 60000) {
      return {
        coverage: '30/60',
        gap: 'insufficient',
        message: 'You may need higher coverage to protect your assets'
      };
    } else if (exposure <= 100000) {
      return {
        coverage: '50/100',
        gap: 'insufficient',
        message: 'Consider increasing your liability coverage'
      };
    } else if (exposure <= 300000) {
      return {
        coverage: '100/300',
        gap: 'adequate',
        message: 'Your current coverage may be adequate'
      };
    } else if (exposure <= 500000) {
      return {
        coverage: '500/500',
        gap: 'adequate',
        message: 'Higher limits recommended for better protection'
      };
    } else {
      return {
        coverage: '500/500 + $1M Umbrella',
        gap: 'excellent',
        message: 'Excellent coverage for high-value assets'
      };
    }
  };

  // Calculate gap analysis
  const analyzeGap = (currentCoverage, recommended) => {
    const currentLimits = {
      'Not sure': 50000, // Assume minimum
      '25/50': 25000,
      '30/60': 30000,
      '50/100': 50000,
      '100/300': 100000,
      '250/500': 250000,
      '500/500': 500000,
      '500/1000': 500000
    };

    const currentLimit = currentLimits[currentCoverage] || 50000;
    const recommendedLimit = recommended === '500/500 + $1M Umbrella' ? 1000000 : 
                           parseInt(recommended.split('/')[1]);

    if (currentLimit < recommendedLimit) {
      return 'Insufficient coverage';
    } else if (currentLimit === recommendedLimit) {
      return 'Good match';
    } else {
      return 'Well covered';
    }
  };

  // Display results
  const displayResults = (exposure, recommendation, gapAnalysis) => {
    document.getElementById('exposureAmount').textContent = formatCurrency(exposure);
    document.getElementById('recommendation').textContent = recommendation.coverage;
    
    const gapElement = document.getElementById('gapAnalysis');
    gapElement.textContent = gapAnalysis;
    gapElement.className = `gap ${recommendation.gap}`;
  };

  // Event listeners
  startBtn.addEventListener('click', () => {
    showSection('formSection');
    scrollToSection('formSection');
  });

  protectionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(protectionForm);
    const data = Object.fromEntries(formData);
    
    // Calculate exposure
    const exposure = calculateExposure(data);
    
    // Get recommendation
    const recommendation = getRecommendation(exposure);
    
    // Analyze gap
    const gapAnalysis = analyzeGap(data.currentCoverage, recommendation.coverage);
    
    // Display results
    displayResults(exposure, recommendation, gapAnalysis);
    
    // Show result section
    showSection('resultSection');
    scrollToSection('resultSection');
    
    // Store data for email
    window.myProtectionData = {
      ...data,
      exposure,
      recommendation: recommendation.coverage,
      gapAnalysis,
      message: recommendation.message
    };
  });

  // Email functionality
  sendBtn.addEventListener('click', () => {
    showSection('emailSection');
    scrollToSection('emailSection');
  });

  emailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const emailData = new FormData(emailForm);
    const userInfo = Object.fromEntries(emailData);
    
    if (window.myProtectionData) {
      const data = window.myProtectionData;
      
      // Create email content
      const subject = `MyProtection Number Results - ${userInfo.userName}`;
      const body = `
MyProtection Number Results

Name: ${userInfo.userName}
Email: ${userInfo.userEmail}

ASSET INFORMATION:
- Home Value: ${formatCurrency(data.homeValue)}
- Vehicle Value: ${formatCurrency(data.vehicleValue)}  
- Savings & Investments: ${formatCurrency(data.savingsValue)}
- Annual Household Income: ${formatCurrency(data.incomeValue)}
- Life Insurance: ${formatCurrency(data.lifeInsurance)}
- Current Auto Coverage: ${data.currentCoverage}

RESULTS:
- Total Protection Exposure: ${formatCurrency(data.exposure)}
- Recommended Coverage: ${data.recommendation}
- Gap Analysis: ${data.gapAnalysis}

Next Steps: ${data.message}

This analysis was generated by the MyProtection educational tool.
This is not a quote, offer, or guarantee of coverage.

Best regards,
${userInfo.userName}
      `;
      
      // Create mailto link
      const mailtoLink = `mailto:Tre.Scott@countryfinancial.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Reset forms and show success message
      setTimeout(() => {
        alert('Your email client should now open with your results pre-filled. If it doesn\'t open automatically, please copy your results and email them to Tre.Scott@countryfinancial.com');
        protectionForm.reset();
        emailForm.reset();
        showSection('formSection');
      }, 1000);
    }
  });

  // Book appointment
  bookBtn.addEventListener('click', () => {
    window.open('https://outlook.office365.com/book/TreScottAgencyCOUNTRYFinancial@countryfinancial.com/?RefID=rep_bio&ismsaljsauthenabled=true', '_blank');
  });

  // Reset functionality
  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      protectionForm.reset();
      showSection('formSection');
      scrollToSection('formSection');
    });
  }

  // Smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Real-time calculation preview (optional enhancement)
  const inputs = ['homeValue', 'vehicleValue', 'savingsValue', 'incomeValue'];
  inputs.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('input', () => {
        // Optional: Show live calculation preview
        // This could be enhanced to show partial calculations
      });
    }
  });

  // Form validation enhancements
  const validateForm = () => {
    const requiredFields = protectionForm.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!field.value || field.value === '') {
        field.style.borderColor = '#ff4444';
        isValid = false;
      } else {
        field.style.borderColor = 'var(--border)';
      }
    });
    
    return isValid;
  };

  // Add validation on submit
  calcBtn.addEventListener('click', () => {
    if (!validateForm()) {
      alert('Please fill in all required fields.');
    }
  });

  // Initialize
  console.log('MyProtection App initialized successfully');
});