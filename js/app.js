// 本地存储工具
const Store = {
    set(key, val) {
        localStorage.setItem(key, JSON.stringify(val))
    },
    get(key) {
        let d = localStorage.getItem(key)
        return d ? JSON.parse(d) : null
    }
}

// 模拟濮阳用户数据
const UserList = [
    {id:1,name:"小冉",age:24,height:163,area:"华龙区",hobby:"探店、看电影",img:"https://picsum.photos/id/64/300/300"},
    {id:2,name:"阿泽",age:26,height:178,area:"濮阳县",hobby:"爬山、篮球",img:"https://picsum.photos/id/91/300/300"},
    {id:3,name:"月月",age:23,height:160,area:"清丰县",hobby:"拍照、露营",img:"https://picsum.photos/id/1027/300/300"},
    {id:4,name:"凯凯",age:27,height:182,area:"华龙区",hobby:"剧本杀、自驾",img:"https://picsum.photos/id/1012/300/300"},
    {id:5,name:"静静",age:25,height:165,area:"南乐县",hobby:"美食、逛街",img:"https://picsum.photos/id/1062/300/300"},
    {id:6,name:"小宇",age:28,height:176,area:"范县",hobby:"钓鱼、骑行",img:"https://picsum.photos/id/1074/300/300"},
    {id:7,name:"曼曼",age:22,height:161,area:"台前县",hobby:"画画、奶茶",img:"https://picsum.photos/id/1068/300/300"},
    {id:8,name:"辰辰",age:25,height:179,area:"华龙区",hobby:"健身、桌游",img:"https://picsum.photos/id/1005/300/300"},
]

// 线下活动数据
const ActivityList = [
    {id:1,title:"濮阳周末露营交友局",time:"07.18 周六下午",addr:"龙湖湿地公园",img:"https://picsum.photos/id/1036/400/200"},
    {id:2,title:"剧本杀相亲专场",time:"07.19 周日晚上",addr:"华龙区万达剧本馆",img:"https://picsum.photos/id/1060/400/200"},
    {id:3,title:"青年美食聚餐",time:"07.20 周一晚",addr:"老城特色菜馆",img:"https://picsum.photos/id/1080/400/200"},
]

// 页面加载渲染同城推荐
window.onload = function(){
    renderUser()
    renderActivity()
}

// 渲染同城用户卡片
function renderUser(){
    const wrap = document.getElementById("userWrap")
    if(!wrap) return
    let html = ""
    UserList.forEach(u=>{
        html += `
        <div class="user-card">
            <img src="${u.img}" class="user-img">
            <div class="user-info">
                <div class="user-name">
                    ${u.name} <span class="user-tag">${u.age}岁/${u.height}cm</span>
                </div>
                <p class="user-desc">爱好：${u.hobby}</p>
                <p class="user-area">📍 ${u.area}</p>
                <button class="card-btn" onclick="goChat(${u.id})">私信打招呼</button>
            </div>
        </div>
        `
    })
    wrap.innerHTML = html
}

// 渲染活动
function renderActivity(){
    const wrap = document.getElementById("actWrap")
    if(!wrap) return
    let html = ""
    ActivityList.forEach(a=>{
        html += `
        <div class="activity-card">
            <img src="${a.img}" class="activity-img">
            <div class="activity-info">
                <h4>${a.title}</h4>
                <p class="activity-time">⏰ ${a.time}</p>
                <p>📍 ${a.addr}</p>
                <button class="card-btn" style="margin-top:10px;">立即报名</button>
            </div>
        </div>
        `
    })
    wrap.innerHTML = html
}

// 跳转聊天页
function goChat(uid){
    Store.set("chatTargetId", uid)
    window.location.href = "chat.html"
}

// 登录注册逻辑
function register(){
    let name = document.getElementById("regName").value
    let phone = document.getElementById("regPhone").value
    let pwd = document.getElementById("regPwd").value
    let area = document.getElementById("regArea").value
    if(!name||!phone||!pwd||!area){
        alert("请填写完整信息")
        return
    }
    let user = {name,phone,pwd,area}
    Store.set("localUser", user)
    alert("注册成功！自动登录")
    window.location.href = "index.html"
}
function login(){
    let phone = document.getElementById("loginPhone").value
    let pwd = document.getElementById("loginPwd").value
    let local = Store.get("localUser")
    if(!local){
        alert("暂无账号，请先注册")
        return
    }
    if(local.phone == phone && local.pwd == pwd){
        alert("登录成功")
        window.location.href = "index.html"
    }else{
        alert("手机号或密码错误")
    }
}

// 聊天发送消息
function sendMsg(){
    let input = document.getElementById("msgInput")
    let val = input.value.trim()
    if(!val) return
    const box = document.getElementById("chatBox")
    box.innerHTML += `<div class="msg-self"><span>${val}</span></div>`
    input.value = ""
    box.scrollTop = box.scrollHeight
}
