/* Optional marketing automation previews. No external actions or live connections. */
const automationWorkflows = [
  {id:'inquiry',name:'New lead response',category:'CAPTURE & CONVERT',channels:'Email + SMS',trigger:'A new inquiry is captured',description:'Acknowledge the inquiry, route the lead and help the producer respond.',steps:['Capture source and contact preferences','Assign a producer using agency routing','Send the approved acknowledgment','Create the next follow-up task'],stop:'A reply returns the conversation to the producer. An opt-out stops promotional messages.',metrics:'Response time · Contact rate · Appointments · Placements'},
  {id:'nurture',name:'Email & SMS nurture',category:'CAPTURE & CONVERT',channels:'Email + SMS',trigger:'An eligible lead enters the nurture stage',description:'Coordinate a sequence of useful messages with clear ownership and stop conditions.',steps:['Check eligibility and preferred channel','Send the first approved message','Wait before the next touch','Escalate unanswered opportunities to the producer'],stop:'Pause on reply or booking; stop on opt-out or a disqualifying stage change.',metrics:'Replies · Bookings · Unsubscribes · Placed business'},
  {id:'appointment',name:'Appointment reminders',category:'APPOINTMENTS',channels:'Email + SMS',trigger:'An appointment is confirmed',description:'Send confirmation and reminders, with context for the upcoming conversation.',steps:['Confirm the appointment details','Send an approved confirmation','Remind the customer before the appointment','Notify the producer of changes'],stop:'Cancel remaining reminders if the appointment is cancelled or rescheduled.',metrics:'Attendance · Reschedules · No-shows · Next-step completion'},
  {id:'noshow',name:'No-show recovery',category:'APPOINTMENTS',channels:'Email + SMS',trigger:'The producer records a missed appointment',description:'Offer a convenient way to reconnect and keep the opportunity visible.',steps:['Confirm the missed appointment','Prepare a rebooking message','Offer the approved scheduling link','Assign a producer follow-up if needed'],stop:'Pause on reply or rebooking; stop on opt-out.',metrics:'Rebookings · Attendance after rebooking · Placements'},
  {id:'reactivation',name:'Lead reactivation',category:'ONGOING RELATIONSHIPS',channels:'Email',trigger:'A lead meets the agency’s inactivity rule',description:'Reconnect with eligible past inquiries using a reviewed message and current preferences.',steps:['Select the eligible inactive group','Check current preferences and ownership','Send a reviewed reactivation message','Route interested replies to a producer'],stop:'Exclude opted-out contacts; pause on reply or a renewed opportunity.',metrics:'Qualified replies · New appointments · Acquisition cost · Revenue'},
  {id:'review',name:'Reviews & referrals',category:'ONGOING RELATIONSHIPS',channels:'Email',trigger:'A service interaction is confirmed complete',description:'Prepare a timely review or referral invitation after the customer’s issue is resolved.',steps:['Verify the service interaction is resolved','Choose an approved invitation','Send through the preferred channel','Record the response or introduction'],stop:'Hold when an issue is unresolved; stop on opt-out.',metrics:'Invitations · Reviews · Referral inquiries · Referral outcomes'},
  {id:'retention',name:'Customer care & retention',category:'ONGOING RELATIONSHIPS',channels:'Email',trigger:'A verified review date or service event arrives',description:'Coordinate check-ins, reviews and required human follow-through.',steps:['Read the verified date and customer context','Assign the appropriate team member','Prepare the approved check-in','Track response and completed follow-through'],stop:'Pause automated messaging when the customer replies or human review is needed.',metrics:'Completed reviews · Service resolution · Retention where data supports it'},
  {id:'handoff',name:'Lead routing & follow-up',category:'TEAM EXECUTION',channels:'Internal task',trigger:'A lead changes stage or needs a new owner',description:'Assign responsibility, set a next step and flag work that has not been completed.',steps:['Read source, stage and routing rules','Assign the responsible producer','Create a dated task with customer context','Escalate overdue work to the manager'],stop:'End the reminder when completion is verified; reassign if ownership changes.',metrics:'Assignment time · Task completion · Response time · Stage conversion'}
];
const automationCapabilities = [
  ['Websites, funnels & forms','Capture inquiries with campaign and source context.'],
  ['Email campaigns','Prepare broadcasts and automated nurture sequences.'],
  ['SMS automation','Coordinate acknowledgments, reminders and follow-up.'],
  ['Calendars & appointments','Offer booking, confirmation and rebooking paths.'],
  ['Social & content publishing','Plan and schedule reviewed content.'],
  ['Reviews & referrals','Support introductions and relationship growth.'],
  ['CRM workflows & reporting','Connect triggers, ownership, activity and outcomes.']
];
groupNav[1][1].splice(1,0,['automation','tasks','Marketing automation']);
navs.splice(0,navs.length,...groupNav.flatMap(g=>g[1]));
const beforeAutomationMarketing=views.marketing;
const beforeAutomationDashboard=views.dashboard;
const beforeAutomationPlatform=views.platform;
const beforeAutomationBind=bind;
const beforeAutomationFeature=feature;

function automationNotice(){return `<div class="automation-notice"><div><span class="badge green">AVAILABLE TO ACTIVATE</span><strong>Marketing automation is part of the platform.</strong><p>Choose the capabilities your agency needs. Explore a workflow, adjust its settings and try a simulation.</p></div><button class="primary" data-page="automation">Explore automation ${ic('arrow')}</button></div>`}
views.dashboard=function(){const html=beforeAutomationDashboard();return state.role==='owner'?html.replace('<div class="workbench">',automationNotice()+'<div class="workbench">'):html};
views.marketing=function(){if(state.marketingTab==='automation')return automationWorkspace(true);return beforeAutomationMarketing().replace('<div class="tabs">',automationNotice()+'<div class="tabs"><button data-marketingtab="automation">Automation</button>')};
views.platform=function(){return `<div class="deck-comparison"><span>Compare the product concepts</span><a href="partner-deck.pdf" target="_blank" rel="noopener">Original deck ↗</a><a href="partner-deck-v2.pdf" target="_blank" rel="noopener">V2: intelligence, memory & agent ↗</a></div>`+beforeAutomationPlatform()};
views.automation=function(){return automationWorkspace(false)};

function automationWorkspace(fromMarketing){
  const configured=Object.keys(state.automationConfigs||{}).length;
  return header('Marketing automation','Available capabilities. Activate what fits your agency.',`<button class="primary" data-workflow="inquiry">${ic('spark')} Preview a lead workflow</button>`)
    +(fromMarketing?sectionTabs([['channels','Channels'],['campaigns','Campaigns'],['funnels','Funnels & nurture'],['automation','Automation'],['feedback','Conversation feedback']],'automation','marketingtab'):'')
    +`<div class="automation-summary"><div><span class="badge green">OPTIONAL MODULES</span><h2>Capture, nurture and follow through.</h2><p>One connected marketing foundation, with the flexibility to use only what you need.</p></div><div class="automation-summary-stat"><strong>${automationWorkflows.length}</strong><span>workflow previews</span></div><div class="automation-summary-stat"><strong>${configured}</strong><span>configured in this demo</span></div></div>
    <div class="section-heading automation-section"><div><h2>Workflow library</h2><p>Inspect the trigger, channels, next steps and outcome measures.</p></div><span class="badge">Simulation only · No live messages</span></div>
    <div class="automation-grid">${automationWorkflows.map(w=>{const saved=state.automationConfigs?.[w.id];return `<article class="automation-card"><div class="automation-card-top"><span class="eyebrow">${w.category}</span><span class="badge ${saved?'green':''}">${saved?'Configured in demo':'Available'}</span></div><h2>${w.name}</h2><p>${w.description}</p><div class="automation-trigger"><span>TRIGGER</span>${w.trigger}</div><div class="automation-card-bottom"><span>${esc(saved?.channel||w.channels)}</span><button class="small" data-workflow="${w.id}">Preview & configure →</button></div></article>`}).join('')}</div>
    <section class="card automation-capabilities"><div class="cardhead"><h2>Available across the marketing platform</h2><span class="badge">Select during setup</span></div><div class="automation-capability-grid">${automationCapabilities.map(([name,body])=>`<div><h3>${name}</h3><p>${body}</p></div>`).join('')}</div></section>
    <div class="automation-measure"><div><p class="eyebrow">CONNECT EXECUTION TO RESULTS</p><h2>Follow the outcome beyond the message.</h2><p>Connect source, response, appointment, producer activity and placed business to the financial result.</p></div><div class="actions"><button data-page="marketing">Inspect marketing</button><button data-page="profitability">Inspect financial results</button></div></div>
    <p class="footnote">This is a product concept. Saving changes only this demo session; it does not enable a live workflow. Reloading or resetting clears your changes. Supported modules and connections would be confirmed during agency setup.</p>`;
}
function openAutomationWorkflow(id){
  if(state.role!=='owner')return;
  const w=automationWorkflows.find(x=>x.id===id);if(!w)return;
  const saved=state.automationConfigs?.[id];
  const options=w.channels==='Internal task'?['Internal task']:['Email','SMS','Email + SMS'];
  drawer(w.name,`<span class="badge green">Available capability</span><span class="badge">Workflow preview</span><div class="inset"><strong>Trigger</strong><br>${w.trigger}</div>
    <div class="automation-settings"><label>Channel<select id="automation-channel">${options.map(v=>`<option ${v===(saved?.channel||w.channels)?'selected':''}>${v}</option>`).join('')}</select></label><label>Response or reminder timing<select id="automation-delay">${['Immediately','After 15 minutes','After 1 day'].map(v=>`<option ${v===(saved?.delay||'Immediately')?'selected':''}>${v}</option>`).join('')}</select></label></div>
    <div class="automation-steps">${w.steps.map((s,i)=>`<div><span>${i+1}</span><p>${s}</p></div>`).join('')}</div>
    <div class="inset"><strong>When the workflow pauses or stops</strong><br>${w.stop}</div><p class="subtext"><strong>Track:</strong> ${w.metrics}</p>
    <button class="primary wide" id="automation-save">${saved?'Update demo configuration':'Save demo configuration'}</button><p id="automation-save-status" class="automation-save-status" role="status">${saved?'Configuration saved for this demo session.':'Adjust the settings, then save to try the sequence.'}</p>
    <div class="automation-simulation"><h3>Try a sample event</h3><label>Scenario<select id="automation-event"><option value="eligible">Eligible trigger occurs</option><option value="reply">Customer replies</option>${w.channels==='Internal task'?'<option value="complete">Task completion verified</option>':'<option value="optout">Customer opts out</option>'}</select></label><button class="wide" id="automation-run" ${saved?'':'disabled'}>Run simulation</button><div id="automation-result" aria-live="polite"></div></div>
    <p class="footnote">No live contacts, messages or workflows are affected. Example responses illustrate intended behavior.</p>`,'MARKETING AUTOMATION');
  document.getElementById('automation-save').onclick=()=>{
    state.automationConfigs??={};
    state.automationConfigs[id]={channel:document.getElementById('automation-channel').value,delay:document.getElementById('automation-delay').value};
    render();
    document.getElementById('automation-save-status').textContent='Saved in this demo session. No live workflow activated.';
    document.getElementById('automation-run').disabled=false;
    document.getElementById('automation-save').textContent='Update demo configuration';
    document.getElementById('automation-result').innerHTML='';
  };
  for(const control of ['automation-channel','automation-delay'])document.getElementById(control).onchange=()=>{
    document.getElementById('automation-run').disabled=true;
    document.getElementById('automation-save-status').textContent='Unsaved changes. Save these settings before running the simulation.';
    document.getElementById('automation-result').innerHTML='';
  };
  document.getElementById('automation-run').onclick=()=>{
    const settings=state.automationConfigs?.[id];if(!settings)return;
    const event=document.getElementById('automation-event').value;
    const result=event==='reply'?'Sequence paused. The reply is routed to the responsible team member for review.':event==='optout'?'Promotional messages stopped. The opt-out is recorded for this simulated sequence.':event==='complete'?'Completion verified in the sample event. Task reminders stopped.':`Eligible trigger recorded. ${settings.channel==='Internal task'?'The assigned task':'The approved '+esc(settings.channel)+' step'} would be queued ${esc(settings.delay.toLowerCase())}. Delivery and business outcomes remain unverified.`;
    document.getElementById('automation-result').innerHTML=`<div class="answer"><strong>Simulation result</strong><p>${result}</p><small>No real action occurred.</small></div>`;
  };
}
feature=function(f){if(f==='automation'){openAutomationWorkflow('nurture');return;}beforeAutomationFeature(f)};
bind=function(){beforeAutomationBind();document.querySelectorAll('#app [data-workflow]').forEach(b=>b.onclick=()=>openAutomationWorkflow(b.dataset.workflow))};
render();
