const API = "https://api.github.com/users/"


let  input, btn, output
input = document.getElementById('input')
btn = document.getElementById('btn')
output = document.getElementById('output')
let div = document.getElementById('repos')
div.className='repos'

let ggwp = document.getElementById('ggwp')

 const searchUser = async ()=>{
    const url = API + input.value
    let req = await fetch(url)
    let res = await req.json()
    console.log(res)
    renderUsers(res)
 }

  const renderUsers = (a)=>{
    output.innerHTML=''
    

    let div = document.createElement('div')

    let login = document.createElement('h4')
    login.innerHTML = a.login  
    
    let name = document.createElement('h4')
    name.innerHTML = a.name
    
    let avatar = document.createElement('img')
    avatar.src = a.avatar_url
    avatar.className='avatar'

    let loc = document.createElement('h4')
    loc.innerHTML = a.location

    let repos = document.createElement('h4')
    repos.innerHTML = a.public_repos +' repositories'
    
    let followers = document.createElement('h4')
    followers.innerHTML = a.followers + ' followers'

    let following = document.createElement('h4')
    following.innerHTML = a.following + ' following'

    repos.addEventListener('click',()=>{
         userRepos(a.public_repos)
    })

    followers.addEventListener('click',()=>{
        userFollowers(a.followers)
    })

    following.addEventListener('click',()=>{
        userFollowing(a.following)
    })


    div.append(avatar, name, login, followers, following, loc, repos, repos)
    output.append(div)
    
    }

    const userRepos = async () =>{
        let url = API + input.value + "/repos"
        let req = await fetch(url)
        let res = await req.json()
        console.log(res);
        renderRepos(res)
        
    }

   const renderRepos = (r)=>{
     repos.innerHTML=''
     ggwp.innerHTML=''
     r.forEach((el)=>{
       
        
        let name = document.createElement('p')
        name.innerHTML=el.name
        name.className='name'
     
        let private = document.createElement('p')
        private.className='public'
        private.innerHTML='public'

        let language = document.createElement('p')
        language.innerHTML=el.language
        language.className='language'



        let div2 = document.createElement('div')
        div2.className='div2'

        let div3 = document.createElement('div')
        div3.className='div3'

        if (el.language == 'Python'){
          language.innerHTML = `
          <div class='circle'>
          <div class='circleP'></div> Python
          </div>`
      }else if(el.language == 'JavaScript'){
          language.innerHTML = `
          <div class='circle'>
          <div class='circleJS'></div> 
          JavaScript
          </div>`
      }else if(el.language == 'C++'){
          language.innerHTML = `
          <div class='circle'>
          <div class='circleC'></div> 
          C++
          </div>`
      }else if (el.language == 'java') {
          language.innerHTML = `
          <div class='circle'>
          <div class='circleJ'></div> 
          Java
          </div>`
      }else{
          language.innerHTML = el.language
      } 

        let div1 = document.createElement('div')
        div1.classList = 'repos'
        div3.append(name,private)
        div2.append(div3,language)
        div1.append(div2)
        div.append(div2)
        
     })
   }

   const userFollowers = async()=>{
    let url = API + input.value + "/followers"
    let req = await fetch(url)
    let res = await req.json()
    console.log(res);
    renderFollowers(res)
    
   }
   
   const renderFollowers = async(f)=>{
     repos.innerHTML=''
     ggwp.innerHTML=''

      f.forEach((el)=>{
          let login = document.createElement('p')
          login.innerText = el.login
          login.className='loginfollowers'

          let avatar = document.createElement('img')
          avatar.className='avatar2'
          avatar.src= el.avatar_url
          
         let followersDiv = document.createElement('div')
         followersDiv.className = 'followersDiv'

          followersDiv.append(avatar,login)
          ggwp.append(followersDiv)


      })

   }
   const userFollowing = async()=>{
    let url = API + input.value + "/following"
    let req = await fetch(url)
    let res = await req.json()
    console.log(res);
    renderFollowing(res)
    
   }
   
   const renderFollowing = async(ff)=>{
    repos.innerHTML=''
    ggwp.innerHTML=''

      ff.forEach((el)=>{
          let login = document.createElement('p')
          login.innerText = el.login
          login.className='loginfollowers'
        
let followingDiv = document.createElement('div')
followingDiv.className='followingDiv'

          let avatar = document.createElement('img')
          avatar.className='avatar2'
          avatar.src= el.avatar_url
          
          followingDiv.append(avatar,login)
          ggwp.append(followingDiv)
      })
   }

    input.addEventListener('keyup', e => {
    e.preventDefault();
    if(e.keyCode === 13){
      searchUser()
    }
  })

 btn.addEventListener('click',()=>{
    searchUser()
})

