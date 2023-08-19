// alert('hi')

window.onload = () => {

  document.querySelector('.input').onkeypress = async (e) => {
    if (e.key === 'Enter' && document.querySelector('input').value !== '') {
      res = await fetch(`http://127.0.0.1:8000`, {
        method: 'POST',
        body: JSON.stringify({
          name: document.querySelector('input').value,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      document.querySelector('input').value = '';
      console.log(await res.json())
    }
  }

}

(async () => {
  res = await fetch(`http://127.0.0.1:8000`)
  console.log(await res.json())
})();






