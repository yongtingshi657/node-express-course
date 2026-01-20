const form = document.getElementById('form')

const data = document.getElementById('data')

const getData = document.getElementById('get-btn')

form.addEventListener('submit', async(e)=> {
    e.preventDefault()
    const formData = new FormData(form)

    const formObj = Object.fromEntries(formData)

    try {
        const result = await axios.post('http://localhost:3500/api/v1/logon', formObj)

        localStorage.setItem('token', result.data.token)

        console.log('user signer up')

        form.reset()

    }catch(error){
          localStorage.removeItem('token')
    }
  
})

getData.addEventListener('click', async(e)=> {
    const token = localStorage.getItem('token')

    try {
       const result = await axios.get('http://localhost:3500/api/v1/hello', {
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        data.innerHTML = `<h1>${result.data.msg}</h1>`
    }catch(error){
        data.innerHTML = `<h1>${error.response.data.msg || 'An error occurred'}</h1>`
    }
})