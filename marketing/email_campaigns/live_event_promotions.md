# Live Event Promotions — Email Templates

**Brand Voice:** Energetic, community-driven, FOMO-inducing but warm  
**Tagline:** *"Every Collection Has a Story. Collectiverse Helps You Tell It."*  
**Goal:** Drive event attendance, build community engagement, activate hosts

---

## 1. Upcoming Live Stream Notification

**Trigger:** 24 hours before a live event the user follows/RSVP'd to  
**Subject Line:** TOMORROW: {{host_name}} goes live with {{event_topic}} 🎙️  
**Preview Text:** Set your alarm — {{event_time}} {{timezone}}. Don't miss this one.

---

**Body:**

Hi {{first_name}},

A live event you're interested in starts **tomorrow!**

---

## 🎙️ {{event_title}}

**Hosted by:** {{host_name}} {{host_badge}}  
**When:** {{event_date}} at {{event_time}} {{timezone}}  
**Duration:** ~{{duration}} minutes  
**Viewers expected:** {{expected_viewers}}+  

---

**What to expect:**

{{event_description}}

---

**About the host:**

{{host_name}} is a {{host_description}} with {{host_followers}} followers on Collectiverse. Known for {{host_specialty}}.

⭐ Host rating: {{host_rating}}/5 from {{host_reviews}} events

---

**What viewers are saying about {{host_name}}'s shows:**

> *"{{host_review_1}}"*  
> *"{{host_review_2}}"*

---

**📱 How to watch:**

1. Open Collectiverse at {{event_time}} {{timezone}} tomorrow
2. Tap the **Live** tab — the event will be featured at the top
3. Join the chat, ask questions, and interact in real time!

**Set a reminder so you don't miss it:**

**CTA Button:** [Set Reminder + Add to Calendar →]

---

**Can't make it live?** We'll send you the recap if you miss it.  
[Watch Later Instead →]

---

{{#if is_live_sale}}
**💰 This is a LIVE SALE event!**  
Items will be available for purchase during the stream. Have your payment method ready.  
Popular items go fast — early viewers get first pick!
{{/if}}

---

## 2. "You're Invited" Event Card

**Trigger:** Personalized invitation to a curated or exclusive event  
**Subject Line:** {{first_name}}, you're invited to {{event_name}} 🎟️  
**Preview Text:** An exclusive event for {{collecting_category}} collectors. Limited spots. You're on the list.

---

**Body:**

Hi {{first_name}},

We're hosting something special — and based on your passion for {{collecting_category}}, we think you'll love it.

---

## 🎟️ You're Invited

### {{event_name}}

---

**📅 When:** {{event_date}} at {{event_time}} {{timezone}}  
**📍 Where:** {{event_location}} (virtual / in-person / hybrid)  
**👥 Capacity:** {{capacity}} spots  
**🎯 For:** {{target_audience}} collectors  
**💰 Cost:** {{event_cost}}  

---

**What this event is about:**

{{event_full_description}}

---

**Featured presenters/hosts:**

🎤 **{{speaker_1_name}}** — {{speaker_1_bio}}  
🎤 **{{speaker_2_name}}** — {{speaker_2_bio}}  
{{#if speaker_3}}🎤 **{{speaker_3_name}}** — {{speaker_3_bio}}{{/if}}

---

**What you'll get:**

✅ {{benefit_1}}  
✅ {{benefit_2}}  
✅ {{benefit_3}}  
✅ {{benefit_4}}  
🎁 **Bonus:** {{bonus_perk}}  

---

**Why you were invited:**

You're one of {{invite_count}} collectors selected for this event based on your {{personalization_reason}}. This isn't a mass invite — we curated this guest list carefully.

---

**Spots are limited:** {{spots_remaining}} of {{capacity}} remaining.

**CTA Button:** [Accept My Invitation — RSVP Now →]

---

**Can't make it?** Let us know and we'll save your spot for the next one.  
[I Can't Make This One →]

---

**Share with a friend:** Know someone who'd love this? Forward this email — they can request an invite.

---

## 3. Post-Event Recap

**Trigger:** 2-4 hours after event ends (or next morning for evening events)  
**Subject Line:** Recap: {{event_name}} — here's what you missed (or what happened!) 📹  
**Preview Text:** {{attendee_count}} collectors joined. {{highlights_count}} highlights. Full replay available.

---

**Body:**

Hi {{first_name}},

{{#if attended}}
**Thanks for joining {{event_name}} last night!** You were one of {{attendee_count}} collectors who showed up — and what an event it was.
{{else}}
**You missed a great one!** {{event_name}} drew {{attendee_count}} collectors. But don't worry — we've got the full recap (and replay) right here.
{{/if}}

---

## 📊 Event Stats

| | |
|---|---|
| **Attendees** | {{attendee_count}} |
| **Duration** | {{duration}} |
| **Chat messages** | {{chat_count}} |
| **Items shown/sold** | {{items_count}} |
| **Peak viewers** | {{peak_viewers}} |
| **Host rating** | ⭐ {{event_rating}}/5 |

---

## 🌟 Highlights

### 1. {{highlight_1_title}}
{{highlight_1_description}}

### 2. {{highlight_2_title}}
{{highlight_2_description}}

### 3. {{highlight_3_title}}
{{highlight_3_description}}

{{#if highlight_4}}
### 4. {{highlight_4_title}}
{{highlight_4_description}}
{{/if}}

---

## 🎬 Watch the Replay

The full event replay is available for the next 7 days:

**CTA Button:** [Watch Replay →]

---

{{#if had_live_sales}}
## 💰 Items Sold During the Event

| Item | Final Price | Buyer |
|------|------------|-------|
| {{sale_1_item}} | ${{sale_1_price}} | {{sale_1_buyer}} |
| {{sale_2_item}} | ${{sale_2_price}} | {{sale_2_buyer}} |
| {{sale_3_item}} | ${{sale_3_price}} | {{sale_3_buyer}} |

**Missed out?** Some items from the event are still available on the marketplace:  
[Browse Remaining Items →]
{{/if}}

---

## 📸 Community Moments

> *"{{community_quote_1}}"* — {{quoter_1}}  
> *"{{community_quote_2}}"* — {{quoter_2}}  

---

## 📅 Coming Up Next

Don't miss these upcoming events:

🎙️ **{{next_event_1}}** — {{next_event_1_date}} | [RSVP →]  
🎙️ **{{next_event_2}}** — {{next_event_2_date}} | [RSVP →]  
🎙️ **{{next_event_3}}** — {{next_event_3_date}} | [RSVP →]  

---

**Thank you for being part of the community.** Events like these are what make Collectiverse special — it's not just a platform, it's a place where collectors come together.

*See you at the next one!* 🙌

---

## 4. Weekly Events Digest

**Trigger:** Weekly (Monday morning)  
**Subject Line:** This week on Collectiverse: {{event_count}} events you'll want to see 📅  
**Preview Text:** Live shows, auctions, meetups, and more. Your personalized event guide for the week.

---

**Body:**

Hi {{first_name}},

Here's what's happening on Collectiverse this week — curated based on what you collect:

---

## 📅 Your Week at a Glance

---

### 🔥 Featured Event

**{{featured_event_name}}**  
🎤 {{featured_host}} | 📅 {{featured_date}} | ⏰ {{featured_time}}  
{{featured_description}}  
👥 {{featured_rsvps}} collectors attending  
**[RSVP — Limited Spots →]**

---

### 🎙️ Live Shows

| Day | Time | Event | Host | Category |
|-----|------|-------|------|----------|
| {{day_1}} | {{time_1}} | {{event_1}} | {{host_1}} | {{cat_1}} |
| {{day_2}} | {{time_2}} | {{event_2}} | {{host_2}} | {{cat_2}} |
| {{day_3}} | {{time_3}} | {{event_3}} | {{host_3}} | {{cat_3}} |
| {{day_4}} | {{time_4}} | {{event_4}} | {{host_4}} | {{cat_4}} |
| {{day_5}} | {{time_5}} | {{event_5}} | {{host_5}} | {{cat_5}} |

---

### 🔨 Live Auctions

💰 **{{auction_1_title}}** — {{auction_1_items}} items | {{auction_1_date}} | [Preview Items →]  
💰 **{{auction_2_title}}** — {{auction_2_items}} items | {{auction_2_date}} | [Preview Items →]  

---

### 🤝 Meetups & Social

🗣️ **{{meetup_1}}** — {{meetup_1_details}} | [Join →]  
🗣️ **{{meetup_2}}** — {{meetup_2_details}} | [Join →]  

---

### 🎓 Learn & Grow

📚 **{{learn_1}}** — {{learn_1_topic}} | [Register →]  
📚 **{{learn_2}}** — {{learn_2_topic}} | [Register →]  

---

## 🏆 Last Week's Top Events

The community loved these:

1. **{{last_week_1}}** — {{last_week_1_viewers}} viewers, ⭐ {{last_week_1_rating}}/5  
2. **{{last_week_2}}** — {{last_week_2_viewers}} viewers, ⭐ {{last_week_2_rating}}/5  
3. **{{last_week_3}}** — {{last_week_3_viewers}} viewers, ⭐ {{last_week_3_rating}}/5  

[Watch Replays →]

---

**CTA Button:** [See Full Events Calendar →]

---

**Want to host?** Anyone can host events on Collectiverse. Start with a casual show-and-tell — no pressure, no production crew needed.  
[Host Your First Event →]

---

*Something for every collector, every week.* 📅💚

---

## 5. Host Your Own Event CTA

**Trigger:** Segment — users who attend 3+ events but haven't hosted  
**Subject Line:** You've watched enough shows — it's time to host one 🎤  
**Preview Text:** You've got the knowledge, the collection, and the audience. Here's how to go live.

---

**Body:**

Hi {{first_name}},

You've attended **{{events_attended}} events** on Collectiverse. You clearly love the community.

Here's an idea: **What if you were the one on stage?**

---

**Why you should host:**

🎯 **You know your stuff** — Your expertise in {{user_category}} is worth sharing  
👥 **Built-in audience** — {{follower_count}} followers + Collectiverse promotes events  
💰 **Earn while you share** — Host live sales, accept tips, or grow your seller reputation  
🏆 **Stand out** — Hosts get verified badges and priority marketplace placement  
😊 **It's easier than you think** — Your phone camera and your knowledge is all you need  

---

**Event ideas for {{user_category}} collectors:**

💡 "My Top 10 Finds of the Year" — Show and tell your best  
💡 "Beginner's Guide to {{user_category}}" — Share what you wish you knew  
💡 "Collection Tour" — Walk viewers through your collection  
💡 "Live Unboxing" — Open a recent haul on camera  
💡 "Q&A Session" — Let the audience ask you anything  
💡 "Live Sale" — Sell items with energy and audience engagement  

---

**How to host your first event:**

1. **Go to Events → Host an Event**
2. **Choose format:** Live show, auction, meetup, or educational
3. **Set date and time** — Schedule ahead or go live now
4. **Write a description** — Tell people what to expect
5. **Promote** — Share the link, or let us notify your followers
6. **Go live** — Tap Start, and you're on!

---

**What you get as a host:**

✅ Custom event page with RSVP  
✅ Live chat and audience interaction  
✅ Screen sharing and multi-camera support  
✅ Real-time analytics (viewers, engagement, sales)  
✅ Recording saved automatically  
✅ Post-event audience feedback  
✅ Promoted in events digest (if you get 4+ star rating)  

---

**First-time host bonus:** Your first event gets featured in our events digest — guaranteed exposure to our entire community.

**CTA Button:** [Host My First Event →]

---

**Need inspiration?** Watch how top hosts do it:  
🎥 [Top-Rated Events This Week →]

---

**Still nervous?** Start with a small, casual show-and-tell. No production value needed. Just you, your camera, and your collection. The community is incredibly supportive of new hosts. ❤️

---

*Your collection has a story. Share it live.* 🎙️

---

## Template Strategy Notes

### Send Frequency & Caps:
- Event reminders: 24 hours + 1 hour before (for RSVP'd events only)
- Weekly digest: 1x per week
- Post-event recap: Within 4 hours of event end
- Host CTA: 1x per 30 days maximum
- Personalized invitations: As earned/curated

### Personalization Points:
- Events matched to user's collecting categories
- Host recommendations based on following/interaction history
- Time zone appropriate scheduling
- Attendance history informs recommendation weight

### A/B Testing:
- Test countdown timers vs. static date/time
- Test single featured event vs. list format for notifications
- Test "you were invited" vs. "don't miss this" framing
- Test post-event recap timing (immediate vs. next morning)
