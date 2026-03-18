// MESSAGES
// ══════════════════════════════════════════
async function renderMessages(){
  const chips=document.getElementById('msgTypeChips');chips.innerHTML='';
  MSG_TYPES.forEach(t=>{
    const c=document.createElement('button');
    c.className='type-chip'+(msgType===t?' on':'');
    c.textContent=t;c.onclick=()=>{msgType=t;renderMessages();};
    chips.appendChild(c);
  });
  const{data}=await sb.from('messages').select('*').eq('user_id',curUser.id).order('created_at',{ascending:false});
  const list=document.getElementById('msgList');
  if(!data||!data.length){list.innerHTML='<div class="empty">এখনো কোনো message নেই</div>';return;}
  list.innerHTML='<div class="msg-list">'+data.map(m=>`
    <div class="msg-card">
      <div class="msg-meta">
        <span class="msg-type">${m.type}</span>
        <span class="msg-time">${new Date(m.created_at).toLocaleDateString('bn-BD')}</span>
        ${m.is_solved?'<span class="solved-badge">✓ solved</span>':'<span style="margin-left:auto;font-size:10px;color:var(--t3)">pending</span>'}
      </div>
      <div class="msg-content">${m.content}</div>
      ${m.admin_reply?`<div class="msg-reply"><div class="msg-reply-lbl">Admin reply</div>${m.admin_reply}</div>`:''}
    </div>`).join('')+'</div>';
}

async function sendMessage(){
  const content=document.getElementById('msgContent').value.trim();
  if(!content){showToast('Message লিখুন');return;}
  const{error}=await sb.from('messages').insert({user_id:curUser.id,user_name:curUser.user_metadata?.name||curUser.email.split('@')[0],content,type:msgType});
  if(error){showToast('Error: '+error.message);return;}
  document.getElementById('msgContent').value='';
  showToast('Message পাঠানো হয়েছে');
  renderMessages();
}

// ══════════════════════════════════════════