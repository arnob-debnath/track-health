// ADMIN PANEL
// ══════════════════════════════════════════
async function renderAdmin(){
  if(!isAdmin){document.getElementById('aContent').innerHTML='<div class="empty">Access denied</div>';return;}
  const[{data:msgs},{data:users}]=await Promise.all([
    sb.from('messages').select('*').order('created_at',{ascending:false}),
    sb.from('profiles').select('*').order('created_at'),
  ]);
  // Messages
  const ml=document.getElementById('adminMsgList');
  if(!msgs||!msgs.length){ml.innerHTML='<div class="empty">কোনো message নেই</div>';}
  else{
    ml.innerHTML='<div class="msg-list">'+msgs.map(m=>`
      <div class="msg-card">
        <div class="msg-meta">
          <span class="msg-user">${m.user_name||'Unknown'}</span>
          <span class="msg-type">${m.type}</span>
          <span class="msg-time">${new Date(m.created_at).toLocaleDateString('bn-BD')}</span>
          ${m.is_solved?'<span class="solved-badge" style="margin-left:auto">✓ solved</span>':''}
        </div>
        <div class="msg-content">${m.content}</div>
        ${m.admin_reply?`<div class="msg-reply"><div class="msg-reply-lbl">Reply (sent)</div>${m.admin_reply}</div>`:''}
        ${!m.is_solved?`
          <textarea class="admin-reply-box" id="reply_${m.id}" placeholder="Reply লিখুন...">${m.admin_reply||''}</textarea>
          <button class="reply-btn" onclick="sendAdminReply('${m.id}')">Reply পাঠাও</button>
          <button class="solve-btn" onclick="markSolved('${m.id}')">✓ Mark as Solved</button>
        `:''}
      </div>`).join('')+'</div>';
  }
  // Users
  const ul=document.getElementById('adminUserList');
  if(!users||!users.length){ul.innerHTML='<div class="empty">কোনো user নেই</div>';}
  else{
    ul.innerHTML=users.map(u=>`
      <div class="user-row">
        <div><div class="user-name">${u.name||'—'}</div></div>
        ${u.is_admin?'<span class="admin-tag">admin</span>':''}
        <span style="font-size:10px;color:var(--t3)">${new Date(u.created_at).toLocaleDateString('bn-BD')}</span>
      </div>`).join('');
  }
}

async function sendAdminReply(msgId){
  const reply=document.getElementById('reply_'+msgId)?.value.trim();
  if(!reply){showToast('Reply লিখুন');return;}
  await sb.from('messages').update({admin_reply:reply}).eq('id',msgId);
  showToast('Reply পাঠানো হয়েছে');renderAdmin();
}
async function markSolved(msgId){
  await sb.from('messages').update({is_solved:true,status:'solved'}).eq('id',msgId);
  showToast('Solved mark করা হয়েছে');renderAdmin();
}

// ══════════════════════════════════════════