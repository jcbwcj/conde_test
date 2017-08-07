Vue.component('xmine',{
	template:`
		<div id="content">
		    <div class="logininfo">
		        <!-- 未登录 -->
		        <div class="nologin center">
		            <a class="loginbut" href="login.html" target="_self">登录 / 注册</a>
		        </div>
		    </div>
		    <!-- 登录地址-->
		    <div class="buttons">
		        <a class="button deliver" href="/user/deliverlist.html">
		            <span>投递</span>
		        </a>
		        <a class="button interview" href="/minterview/interviewlist.html">面试
		        </a>
		        <a class="button invitation" href="/minvite/invitation.html">
		            <span>邀约</span>
		        </a>
		        <a class="button collect">收藏
		        </a>
		    </div>
		    <a href="mine.html" class="weui-btn weui-btn_primary">退出登录</a>
		</div>
	`,
})