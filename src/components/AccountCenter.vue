<template>
    <div class='center-box page-box'>
        <div class='center-content panel'>
            <ul class='center-tab'>
                <li :class="['center-tab-item',{'active':toggleTab == 1}]" @click='changeTab(1)'>账户中心</li>
                <li :class="['center-tab-item',{'active':toggleTab == 2}]" @click='changeTab(2)'>订单中心</li>
            </ul>  
            <div class='center-item-box' v-if='toggleTab == 1'>
                <div class='name-pay'>
                    <div class='name-box'>
                        <h3>{{userName}}</h3>
                        <div>欢迎您
                            <span class='update-name' @click='showModal(0)'>修改昵称</span>
                        </div>
                    </div>
                    <ul class='pay-box'>
                        <li class='pay-item'>
                            <h3 class='panel-title'><span class='icon icon-tasks' style='padding-right:10px;display:inline-block;font-size:16px;'></span>账户余额</h3>
                            <div class='main-pay-detail'>
                                <span>{{pageData[0]}}</span><span class='pay-btn mybtn' @click='showModal(1)'>充值</span>
                            </div>
                        </li>
                        <li class='pay-item'>
                            <h3 class='panel-title'><span class='icon icon-briefcase' style='padding-right:10px;display:inline-block;font-size:16px;'></span>可提现金额</h3>
                            <div class='main-pay-detail'>
                                <span>{{pageData[0]}}</span><span class='pay-btn mybtn' @click='showModal(7)'>提现</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class='name-pay'>
                    <ul class='pay-card-box'>
                        <li class='pay-item'>
                            <h3 class='panel-title'>
                                <span class='icon icon-credit-card' style='padding-right:10px;display:inline-block;font-size:16px;'></span>
                                我的银行卡
                                <span class='pay-btn mybtn' @click='showModal(8)' v-if="pageData[2]!=''">解绑</span>
                            </h3>
                            <div class='main-pay-detail' v-if="pageData[2]!=''">
                                <span class='bank'>{{pageData[4]}}</span>
                                <span class='bank'>{{pageData[3]}}</span>
                                <span class='card-num'>{{pageData[2]}}</span>
                            </div>
                            <div class='main-pay-detail' v-if="pageData[2]==''" @click='showModal(6)'>
                                <span class='icon icon-plus add-card'></span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class='name-pay'>
                    <ul class='pay-card-box'>
                        <li class='pay-item'>
                            <h3 class='panel-title'><span class='icon icon-credit-card' style='padding-right:10px;display:inline-block;font-size:16px;'></span>商家账号</h3>
                            <div class='main-pay-detail'>
                                <span class='bank'>工商银行</span>
                                <span class='card-num'>322331223245323442321</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class='name-pay'>
                    <h3 class='panel-title'><span class='icon icon-laptop' style='padding-right:10px;display:inline-block;font-size:16px;'></span>账号设置</h3>
                    <ul class='pay-card-box'>
                        <li class='set-item'>
                            <div class='set-item-left'>
                                <span class='icon icon-unlock'></span>
                                <div>
                                    <h5>登录密码</h5>
                                    <p>我们建议用户经常修改自己的登录密码，来保证资金的安全</p>
                                </div>
                            </div>
                            <div class='set-item-right mybtn' @click='showModal(4)'>
                                设置
                            </div>
                        </li>
                        <li class='set-item'>
                            <div class='set-item-left'>
                                <span class='icon icon-unlock'></span>
                                <div>
                                    <h5>资金密码</h5>
                                    <p>我们建议用户经常修改自己的资金密码，来保证资金的安全</p>
                                </div>
                            </div>
                            <div class='set-item-right mybtn' @click='showModal(5)'>
                                设置
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class='center-item-box' v-if='toggleTab == 2'>
                <div class='order-tab-box'>
                    <div :class="['order-tab',{'active':orderTab == 1}]" @click='changeOrderTab(1)'>我的投注</div>
                    <div :class="['order-tab',{'active':orderTab == 2}]" @click='changeOrderTab(2)'>彩票报表</div>
                </div>
                <div class='order-list' v-if='orderTab == 1'>
                <!-- 我的投注 -->
                    <table>
                        <thead>
                            <tr>
                                <th>投注彩种</th>
                                <th>投注期号</th>
                                <th>投注玩法</th>
                                <th>投注模式</th>
                                <th>投注倍数</th>
                                <th>投注金额（元）</th>
                                <th>中奖金额（元）</th>
                                <th>订单状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in listData" :key='index'>
                                <td>{{item.pagename}}</td>
                                <td>{{item.expect}}</td>
                                <td>{{item.playname}}</td>
                                <td>{{item.playkind == 1?'元':(item.playkind == 0.1?'角':'分')}}</td>
                                <td>{{item.pagebei}}</td>
                                <td>{{item.pagepay}}</td>
                                <td>{{item.pageget}}</td>
                                <td>{{item.pagestate == 1?'已完成':'未完成'}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class='page-tool btn-group table-page'>
                        <div><select type="text" v-model="pagesize">
                            <option>10</option>
                            <option>20</option>
                            <option>30</option>
                            </select> 条</div>
                        <div class='show-num'>第 {{currPage}} 页</div>
                        <div class='show-num'>共 {{totalPage}} 页</div>
                        <div class='page-btn icon icon-angle-left' @click='prevPage()'></div>
                        <div class='page-btn icon icon-circle' @click='firstPage()'></div>
                        <div class='page-btn icon icon-double-angle-right' @click='lastPage()'></div>
                        <div class='page-btn icon icon-angle-right' @click='nextPage()'></div>
                    </div>
                </div>
                <div class='order-m-list' v-if='orderTab == 1'>
                    <ul>
                        <li v-for='(item,index) in listData' :key='index' :class="{'succ':item.pagestate == 1}">
                            <div class='m-pagename'>{{item.pagename}}</div>
                            <div class='m-expect'>第<span>{{item.expect}}</span>期</div>
                            <div class='m-kind'>
                                <span>玩法：{{item.playname}}</span>
                                <span>模式：{{item.playkind == 1?'元':(item.playkind == 0.1?'角':'分')}}</span>
                                <span>倍数：{{item.pagebei}}</span>
                            </div>
                            <div class='m-pay'>
                                <span>支出：{{item.pagepay}}元</span>
                                <span>收益：{{item.pageget}}元</span>
                            </div>
                        </li>
                    </ul>
                    <div class='mobile-page'>
                        <div class='prev-page' @click='prevPage()'><span class='icon icon-angle-left'></span></div>
                        <div class='home-page' @click='firstPage()'><span class='icon icon-circle'></span></div>
                        <div class='last-page' @click='lastPage()'><span class='icon icon-double-angle-right'></span></div>
                        <div class='next-page' @click='nextPage()'><span class='icon icon-angle-right'></span></div>
                    </div>
                </div>
                <div class='order-list' v-if='orderTab == 2'>
                    <!-- 彩票报表 -->
                    <table>
                        <thead>
                            <tr>
                                <th>彩种</th>
                                <th>开奖期号</th>
                                <th>开奖号码</th>
                                <th>开奖时间</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in hisData" :key='index'>
                                <td>{{item.pagename}}</td>
                                <td>{{item.expect}}</td>
                                <td>{{item.opencode}}</td>
                                <td>{{item.opentime}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class='page-tool btn-group table-page'>
                        <div class='show-num'><select type="text" v-model="pagesize">
                            <option>10</option>
                            <option>20</option>
                            <option>30</option>
                            </select> 条</div>
                        <div class='show-num'>第 {{currPage}} 页</div>
                        <div class='show-num'>共 {{totalPage}} 页</div>
                        <div class='page-btn icon icon-angle-left' @click='prevPage()'></div>
                        <div class='page-btn icon icon-circle' @click='firstPage()'></div>
                        <div class='page-btn icon icon-double-angle-right' @click='lastPage()'></div>
                        <div class='page-btn icon icon-angle-right' @click='nextPage()'></div>
                    </div>
                    
                </div>
                <div class='order-m-list' v-if='orderTab == 2'>
                    <ul>
                        <li v-for='(item,index) in hisData' :key='index' :class="{'succ':item.pagestate == 1}">
                            <div class='m-pagename'>{{item.pagename}}</div>
                            <div class='m-expect'>第<span>{{item.expect}}</span>期</div>
                            <div class='m-expect'>开奖号码：<span>{{item.opencode}}</span></div>
                            <div class='m-pay'>
                                <span>开奖时间：{{item.opentime}}</span>
                            </div>
                        </li>
                    </ul>
                    <div class='mobile-page'>
                        <div class='prev-page' @click='prevPage()'><span class='icon icon-angle-left'></span></div>
                        <div class='home-page' @click='firstPage()'><span class='icon icon-circle'></span></div>
                        <div class='last-page' @click='lastPage()'><span class='icon icon-double-angle-right'></span></div>
                        <div class='next-page' @click='nextPage()'><span class='icon icon-angle-right'></span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class='modal-content' v-if='modal'>
            <div class='modal-box panel'>
                <div class='panel-title'>{{currModalTitle}}</div>
                <div class='modal-item'>
                    <p class='modal-notice'>{{currModaldus}}</p>
                    <div class='input-pay' v-if='currModalKind == 0'><input type="text" maxlength="10" v-model="newName"></div>
                    <div class='input-pay' v-if='currModalKind == 1'><input type="number" v-model="addMoney"> 元</div>
                    <div class='input-pay' v-if='currModalKind == 2'><input type="number" v-model="getMoney"> 元</div>
                    <div v-if='currModalKind == 3'></div>
                    <ul class='input-pwd' v-if='currModalKind == 4'>
                        <li><span>旧密码</span><input type="password" placeholder="请输入旧密码" maxlength="16" v-model="oldUserPwd"></li>
                        <li><span>新密码</span><input type="password" placeholder="请输入新密码" maxlength="16" v-model="newUserPwd"></li>
                        <li><span>确认新密码</span><input type="password" placeholder="请确认新密码" maxlength="16" v-model="cNewUserPwd"></li>
                    </ul>
                    <ul class='input-pwd' v-if='currModalKind == 5'>
                        <li><span>旧密码</span><input type="password" placeholder="请输入旧密码" maxlength="16" v-model="oldMoneyPwd"></li>
                        <li><span>新密码</span><input type="password" placeholder="请输入新密码" maxlength="16" v-model="newMoneyPwd"></li>
                        <li><span>确认新密码</span><input type="password" placeholder="请确新密码" maxlength="16" v-model="cNewMoneyPwd"></li>
                    </ul>
                    <ul class='input-pwd' v-if='currModalKind == 6'>
                        <li><span>姓名</span><input type="text" placeholder="请输入真实姓名" maxlength="16" v-model="cardName"></li>
                        <li><span>开户银行</span><input type="text" placeholder="请输入银行卡开户行" maxlength="64" v-model="cardOpen"></li>
                        <li><span>银行卡号</span><input type="text" placeholder="请输入银行卡号" maxlength="32" v-model="cardNum"></li>
                    </ul>
                    <div class='input-pay' v-if='currModalKind == 7'><input type="password" v-model="moneyPwd"/></div>
                    <div class='input-pay' v-if='currModalKind == 8'><input type="password" v-model="moneyPwd"/></div>
                </div>
                <div class='modal-btn-box'>
                    <span class='mybtn' @click='confirmModal(currModalKind)'>确定</span>
                    <span class='mybtn' @click='canelModal()'>取消</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import '../assets/css/account.css';
export default {
    data(){
        return{
            toggleTab:1,
            orderTab:1,
            currModalTitle:'充值',
            currModaldus:'',
            currModalKind:1,
            modal:false,
            userName:'未登录',
            userId:'',
            pageData:[],
            listData:[],
            hisData:[],
            payData:[],
            newName:'',
            addMoney:0,
            getMoney:0,
            cardNum:'',
            cardName:'',
            cardOpen:'',
            moneyPwd:'',
            oldUserPwd:'',
            newUserPwd:'',
            cNewUserPwd:'',
            oldMoneyPwd:'',
            newMoneyPwd:'',
            cNewMoneyPwd:'',
            startpage:0,
            pagesize:10,
            totalPage:0,
            currPage:1,
            totalDataCount:0,
        }
    },
    mounted(){
        this.toggleTab = this.$route.query.tab;
        this.$emit('getNum',0);
        this.userName = localStorage.getItem('uname');
        this.userId = localStorage.getItem('userid');
        this.refreshData();
        this.getListData();
    },
    watch: {
        $route: {
            handler: function (val, oldVal) {
                this.toggleTab = this.$route.query.tab;
            },
            deep: true
        },
        pagesize:{
            handler:function(val,oldVal){
                this.currPage = 1;
                this.startpage = 0;
                this.pagesize = parseInt(val);
                this.orderTab == 1?this.getListData():this.getHisData();
            }
        }
    },
    methods:{
        changeOrderTab(index){
            this.orderTab = index;
            this.currPage = 1;
            this.pagesize = 10;
            this.startpage = 0;
            this.orderTab == 1?this.getListData():this.getHisData();
        },
        refreshData(){
            this.$http.post('http://lgkj.chuangkegf.com/wuchuang/userinfo.php',{
                kind:'maininfo',
                userid:this.userId,
                username:this.userName
            },{emulateJSON:true}).then((res)=>{
                if(res.body.code == 200){
                    this.pageData = res.body.data;
                    if(this.pageData[5] == 0){
                        this.noCard = true;
                    }
                }
            },(err)=>{
                console.log(err);
            })
        },
        getListData(){
            this.$http.post('http://lgkj.chuangkegf.com/wuchuang/pagekind.php',{
                kind:'gethiscount',
                userid:this.userId,
                username:this.userName
            },{emulateJSON:true}).then((res)=>{
                if(res.body.code == 200){
                    this.totalDataCount = parseInt(res.body.data[0][0]);
                    this.totalPage = Math.ceil(this.totalDataCount/this.pagesize);
                    this.$http.post('http://lgkj.chuangkegf.com/wuchuang/pagekind.php',{
                        kind:'gethis',
                        userid:this.userId,
                        username:this.userName,
                        pagestart:this.startpage,
                        pagesize:this.pagesize
                    },{emulateJSON:true}).then((res)=>{
                        if(res.body.code == 200){
                            this.listData = res.body.data;
                        }
                    },(err)=>{
                        console.log(err);
                    })
                }
            },(err)=>{
                console.log(err);
            })
        },
        getHisData(){
            this.$http.post('http://lgkj.chuangkegf.com/wuchuang/pagekind.php',{
                kind:'getpagecount',
                userid:this.userId,
                username:this.userName
            },{emulateJSON:true}).then((res)=>{
                if(res.body.code == 200){
                    this.totalDataCount = parseInt(res.body.data[0][0]);
                    this.totalPage = Math.ceil(this.totalDataCount/this.pagesize);
                    this.$http.post('http://lgkj.chuangkegf.com/wuchuang/pagekind.php',{
                        kind:'getpagehis',
                        userid:this.userId,
                        username:this.userName,
                        pagestart:this.startpage,
                        pagesize:this.pagesize
                    },{emulateJSON:true}).then((res)=>{
                        if(res.body.code == 200){
                            this.hisData = res.body.data;
                        }
                    },(err)=>{
                        console.log(err);
                    })
                }
            },(err)=>{
                console.log(err);
            })
        },
        changeTab(index){
            this.toggleTab = index;
        },
        canelModal(){
            this.modal = false;
        },
        showModal(kind){
            switch(kind){
                case 0:
                    this.currModalTitle = '修改昵称';
                    this.currModaldus = '昵称不低于3个字符';
                    this.currModalKind = 0;
                    this.modal = true;
                    break;
                case 1:
                    if(this.pageData[2] != ''){
                        this.currModalTitle = '余额充值';
                        this.currModaldus = '请首先使用绑定的银行卡转账到商家账户';
                        this.currModalKind = 1;
                        this.modal = true;
                    }else{
                        this.$emit('showNotice','您尚未绑定银行卡');
                    }
                    break;
                case 2:
                    this.currModalTitle = '提现';
                    this.currModaldus = '提现金额需少于余额';
                    this.currModalKind = 2;
                    this.modal = true;
                    break;
                case 3:
                    this.currModalTitle = '解绑银行卡';
                    this.currModaldus = '解绑银行卡会导致后台无法正常处理您的充值或提现申请！';
                    this.currModalKind = 3;
                    this.modal = true;
                    break;
                case 4:
                    this.currModalTitle = '修改登录密码';
                    this.currModaldus = '修改登录密码可以提升账户安全,不少于6个字符';
                    this.currModalKind = 4;
                    this.modal = true;
                    break;
                case 5:
                    this.currModalTitle = '修改资金密码';
                    this.currModaldus = '修改资金密码可以提升账户安全,不少于6个字符';
                    this.currModalKind = 5;
                    this.modal = true;
                    break;
                case 6:
                    this.currModalTitle = '添加银行卡';
                    this.currModaldus = '请输入准确信息';
                    this.currModalKind = 6;
                    this.modal = true;
                    break;
                case 7:
                    if(this.pageData[2] != ''){
                        this.currModalTitle = '资金密码';
                        this.currModaldus = '请输入资金密码';
                        this.currModalKind = 7;
                        this.modal = true;
                    }else{
                        this.$emit('showNotice','您尚未绑定银行卡');
                    }
                    break;
                case 8:
                    if(this.pageData[2] != ''){
                        this.currModalTitle = '资金密码';
                        this.currModaldus = '请输入资金密码';
                        this.currModalKind = 8;
                        this.modal = true;
                    }else{
                        this.$emit('showNotice','您尚未绑定银行卡');
                    }
                    break;
            }
        },
        confirmModal(kind){
            switch(kind){
                case 0:
                    //修改昵称
                    if(this.newName.length>=3){
                        this.$http.post('http://lgkj.chuangkegf.com/wuchuang/userinfo.php',{
                            kind:'changename',
                            userid:this.userId,
                            username:this.userName,
                            newname:this.newName
                        },{emulateJSON:true}).then((res)=>{
                            if(res.body.code == 200){
                                this.$emit('showNotice','修改成功');
                                this.$emit('changeName',this.newName);
                                this.userName = this.newName;
                                localStorage.setItem('uname',this.userName);
                                this.modal = false;
                                this.refreshData();
                            }else{
                                this.$emit('showNotice','修改失败');
                            }
                        },(err)=>{
                            console.log(err);
                        })
                    }else{
                       this.$emit('showNotice','昵称长度不足3个字符');
                    }
                    break;
                case 1:
                    //充值
                    if(this.addMoney>0){
                        this.$http.post('http://lgkj.chuangkegf.com/wuchuang/userinfo.php',{
                            kind:'addmoney',
                            userid:this.userId,
                            username:this.userName,
                            addmoney:this.addMoney,
                            cardnum:this.pageData[2]
                        },{emulateJSON:true}).then((res)=>{
                            if(res.body.code == 200){
                                this.$emit('showNotice','申请已提交，待处理！ 如有疑问：请联系客服!');
                                this.modal = false;
                                this.refreshData();
                            }else{
                                this.$emit('showNotice','申请失败，请重试！');
                            }
                        },(err)=>{
                            console.log(err);
                        })
                    }else{
                        this.$emit('showNotice','请输入充值金额');
                    }
                    break;
                case 2:
                    //提现
                    if(this.getMoney <= parseFloat(this.pageData[0]) && this.getMoney>0){
                        this.$http.post('http://lgkj.chuangkegf.com/wuchuang/userinfo.php',{
                            kind:'getmoney',
                            userid:this.userId,
                            username:this.userName,
                            getmoney:this.getMoney,
                            cardnum:this.pageData[2]
                        },{emulateJSON:true}).then((res)=>{
                            if(res.body.code == 200){
                                this.$emit('showNotice','申请已提交，待处理！ 如有疑问：请联系客服!');
                                this.modal = false;
                                this.refreshData();
                            }else{
                                this.$emit('showNotice','申请失败，请重试！');
                            }
                        },(err)=>{
                            console.log(err);
                        })
                    }else{
                        this.$emit('showNotice','余额不足');
                    }
                    break;
                case 3:
                    //解绑银行卡
                    this.$http.post('http://lgkj.chuangkegf.com/wuchuang/userinfo.php',{
                        kind:'removecard',
                        userid:this.userId,
                        username:this.userName
                    },{emulateJSON:true}).then((res)=>{
                        if(res.body.code == 200){
                            this.$emit('showNotice','解绑成功！');
                            this.modal = false;
                            this.refreshData();
                        }else{
                            this.$emit('showNotice','解绑失败！');
                        }
                    },(err)=>{
                        console.log(err);
                    })
                    break;
                case 4:
                //修改登录密码
                    if(this.oldUserPwd.length>=6 && this.newUserPwd.length>=6 && this.cNewUserPwd.length>=6
                    && this.newUserPwd == this.cNewUserPwd){
                        this.$http.post('http://lgkj.chuangkegf.com/wuchuang/userinfo.php',{
                            kind:'changeuserpwd',
                            userid:this.userId,
                            username:this.userName,
                            newpwd:this.newUserPwd,
                            oldpwd:this.oldUserPwd
                        },{emulateJSON:true}).then((res)=>{
                            if(res.body.code == 200){
                                this.$emit('showNotice','登录密码，修改成功');
                                this.modal = false;
                                this.refreshData();
                            }else if(res.body.code == 300){
                                this.$emit('showNotice','修改失败');
                            }else if(res.body.code == 400){
                                this.$emit('showNotice','登录密码错误');
                            }
                        },(err)=>{
                            console.log(err);
                        })
                    }
                    break;
                case 5:
                    if(this.oldMoneyPwd.length>=6 && this.newMoneyPwd.length>=6 && this.cNewMoneyPwd.length>=6
                    && this.newMoneyPwd == this.cNewMoneyPwd){
                        this.$http.post('http://lgkj.chuangkegf.com/wuchuang/userinfo.php',{
                            kind:'changemoneypwd',
                            userid:this.userId,
                            username:this.userName,
                            newpwd:this.newMoneyPwd,
                            oldpwd:this.oldMoneyPwd
                        },{emulateJSON:true}).then((res)=>{
                            console.log(res);
                            if(res.body.code == 200){
                                this.$emit('showNotice','资金密码，修改成功');
                                this.modal = false;
                                this.refreshData();
                            }else if(res.body.code == 300){
                                this.$emit('showNotice','修改失败');
                            }else if(res.body.code == 400){
                                this.$emit('showNotice','资金密码错误');
                            }
                        },(err)=>{
                            console.log(err);
                        })
                    }
                    break;
                case 6:
                    //添加银行卡
                    if(this.cardNum != '' && this.cardName != '' && this.cardOpen !=''){
                        this.$http.post('http://lgkj.chuangkegf.com/wuchuang/userinfo.php',{
                            kind:'addcard',
                            userid:this.userId,
                            username:this.userName,
                            cardnum:this.cardNum,
                            cardname:this.cardName,
                            cardopen:this.cardOpen
                        },{emulateJSON:true}).then((res)=>{
                            if(res.body.code == 200){
                                this.$emit('showNotice','银行卡已经绑定！');
                                this.modal = false;
                                this.refreshData();
                            }else{
                                this.$emit('showNotice','绑定失败！');
                            }
                        },(err)=>{
                            console.log(err);
                        })
                    }else{
                        this.$emit('showNotice','请输入完整的银行卡相关信息');
                    }
                    break;
                case 7:
                    //验证资金密码
                    if(this.moneyPwd.length>=6){
                        this.$http.post('http://lgkj.chuangkegf.com/wuchuang/userinfo.php',{
                            kind:'checkpwd',
                            userid:this.userId,
                            username:this.userName,
                            moneypwd:this.moneyPwd
                        },{emulateJSON:true}).then((res)=>{
                            if(res.body.code == 200){
                                this.showModal(2);
                            }else{
                                this.$emit('showNotice','资金密码错误！');
                            }
                        },(err)=>{
                            console.log(err);
                        })
                    }
                    break;
                case 8:
                    //验证资金密码
                    if(this.moneyPwd.length>=6){
                        this.$http.post('http://lgkj.chuangkegf.com/wuchuang/userinfo.php',{
                            kind:'checkpwd',
                            userid:this.userId,
                            username:this.userName,
                            moneypwd:this.moneyPwd
                        },{emulateJSON:true}).then((res)=>{
                            if(res.body.code == 200){
                                this.showModal(3);
                            }else{
                                this.$emit('showNotice','资金密码错误！');
                            }
                        },(err)=>{
                            console.log(err);
                        })
                    }
                    break;
            }
        },
        nextPage(){
            if(this.currPage<this.totalPage){
                this.startpage += this.pagesize;
                this.orderTab == 1?this.getListData():this.getHisData();
                this.currPage++;
            }
        },
        prevPage(){
            if(this.currPage>1){
                this.startpage -= this.pagesize;
                this.orderTab == 1?this.getListData():this.getHisData();
                this.currPage--;
            }
        },
        firstPage(){
            this.startpage = 0;
            this.orderTab == 1?this.getListData():this.getHisData();
            this.currPage = 1;
        },
        lastPage(){
            this.startpage = this.pagesize*(this.totalPage-1);
            this.orderTab == 1?this.getListData():this.getHisData();
            this.currPage = this.totalPage;
        }
    }
}
</script>

