document.querySelector('textarea').addEventListener('input', function() {
  var characterCount = this.value.length;
  var actual = document.getElementById('actual');
  var maximo = document.getElementById('maximo');
  var contadorPalabras = document.getElementById('contador-palabras');

  actual.textContent = characterCount;

  // Esto no es completamente necesario, solo para jugar un poco
  if (characterCount < 70) {
    actual.style.color = '#666';
  } else if (characterCount > 70 && characterCount < 90) {
    actual.style.color = '#6d5555';
  } else if (characterCount > 90 && characterCount < 100) {
    actual.style.color = '#793535';
  } else if (characterCount > 100 && characterCount < 120) {
    actual.style.color = '#841c1c';
  } else if (characterCount > 120 && characterCount < 139) {
    actual.style.color = '#8f0001';
  }

  if (characterCount >= 140) {
    maximo.style.color = '#8f0001';
    actual.style.color = '#8f0001';
    contadorPalabras.style.fontWeight = 'bold';
  } else {
    maximo.style.color = '#666';
    contadorPalabras.style.fontWeight = 'normal';
  }
});
