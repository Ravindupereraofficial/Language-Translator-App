$(document).ready(function () {
    const languages = {
      en: 'English',
      es: 'Spanish',
      fr: 'French',
      de: 'German',
      hi: 'Hindi',
      zh: 'Chinese',
      ja: 'Japanese',
      ru: 'Russian',
      ar: 'Arabic',
      pt: 'Portuguese',
      si: 'Sinhala',  
    };
  
    const populateLanguages = () => {
      $.each(languages, (key, value) => {
        $('#sourceLanguage, #targetLanguage').append(
          `<option value="${key}">${value}</option>`
        );
      });
      $('#targetLanguage').val('si'); 
    };
  
    const translateText = (text, sourceLang, targetLang) => {
      $.ajax({
        url: `https://api.mymemory.translated.net/get`,
        type: 'GET',
        data: {
          q: text,
          langpair: `${sourceLang}|${targetLang}`,
        },
        success: function (response) {
          const translatedText = response.responseData.translatedText;
          $('#outputText').text(translatedText);
        },
        error: function () {
          $('#outputText').text('An error occurred while translating.');
        },
      });
    };
  
    const speakText = (text, lang) => {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = lang;
      window.speechSynthesis.speak(speech);
    };
  
    $('#voiceInputBtn').on('click', () => {
      const recognition = new window.SpeechRecognition() || window.webkitSpeechRecognition();
      recognition.lang = $('#sourceLanguage').val();
      recognition.onresult = (event) => {
        const inputText = event.results[0][0].transcript;
        $('#inputText').val(inputText);
      };
      recognition.start();
    });
  
    $('#translateBtn').on('click', () => {
      const inputText = $('#inputText').val();
      const sourceLang = $('#sourceLanguage').val();
      const targetLang = $('#targetLanguage').val();
      translateText(inputText, sourceLang, targetLang);
    });
  
    $('#speakOutputBtn').on('click', () => {
      const outputText = $('#outputText').text();
      const targetLang = $('#targetLanguage').val();
      speakText(outputText, targetLang);
    });
  
    populateLanguages();
  });
  