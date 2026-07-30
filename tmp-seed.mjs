import Database from 'better-sqlite3';
import path from 'node:path';
import bcrypt from 'bcryptjs';

const db = new Database(path.join(process.cwd(), 'data', 'app.sqlite'));

const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get('lila@example.com');
if (!existingUser) {
  const userId = db.prepare('INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)').run('Lila Hart', 'lila@example.com', bcrypt.hashSync('password123', 10), 'couple', 'active').lastInsertRowid;
  const coupleId = db.prepare('INSERT INTO couples (user_id, partner_one, partner_two, event_date, event_time, venue, address, maps_link, theme, story, welcome_message, dress_code, additional_notes, profile_image, bride_image, groom_image, published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').run(
    userId,
    'Lila',
    'Noah',
    '2026-10-18',
    '6:30 PM',
    'The Rosewood Estate',
    '1845 Willow Avenue, Napa Valley, CA',
    'https://www.google.com/maps/search/?api=1&query=The+Rosewood+Estate+Napa+Valley',
    'elegant',
    'From our first conversation to our forever promise, every chapter has led us here. We are thrilled to celebrate this beautiful new beginning with the people who matter most.',
    'We would be honored to welcome you to an evening of candlelit romance, exquisite dining, and dancing beneath the stars.',
    'Black tie optional',
    'Please arrive 15 minutes early.',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
    1
  ).lastInsertRowid;

  const invitationId = db.prepare('INSERT INTO invitations (couple_id, title, subtitle, event_date, event_time, venue, address, maps_link, theme, story, welcome_message, dress_code, additional_notes, status, colors, music_url, video_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').run(
    coupleId,
    'An Evening of Candlelight & Celebration',
    'A luxury wedding celebration under the stars',
    '2026-10-18',
    '6:30 PM',
    'The Rosewood Estate',
    '1845 Willow Avenue, Napa Valley, CA',
    'https://www.google.com/maps/search/?api=1&query=The+Rosewood+Estate+Napa+Valley',
    'elegant',
    'From our first conversation to our forever promise, every chapter has led us here. We are thrilled to celebrate this beautiful new beginning with the people who matter most.',
    'We would be honored to welcome you to an evening of candlelit romance, exquisite dining, and dancing beneath the stars.',
    'Black tie optional',
    'Please arrive 15 minutes early.',
    'published',
    JSON.stringify({ accent: '#f4c38f', secondary: '#d68bff', base: '#231423', text: '#fff8f2' }),
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  ).lastInsertRowid;

  db.prepare('INSERT INTO analytics (invitation_id, views, rsvp_count) VALUES (?, ?, ?)').run(invitationId, 128, 14);
  db.prepare('INSERT INTO gallery_items (invitation_id, file_name, file_path, mime_type, sort_order) VALUES (?, ?, ?, ?, ?)').run(invitationId, 'cover.jpg', 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80', 'image/jpeg', 0);
  db.prepare('INSERT INTO gallery_items (invitation_id, file_name, file_path, mime_type, sort_order) VALUES (?, ?, ?, ?, ?)').run(invitationId, 'detail.jpg', 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80', 'image/jpeg', 1);
  db.prepare('INSERT INTO gallery_items (invitation_id, file_name, file_path, mime_type, sort_order) VALUES (?, ?, ?, ?, ?)').run(invitationId, 'detail2.jpg', 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=900&q=80', 'image/jpeg', 2);
  db.prepare('INSERT INTO gallery_items (invitation_id, file_name, file_path, mime_type, sort_order) VALUES (?, ?, ?, ?, ?)').run(invitationId, 'detail3.jpg', 'https://images.unsplash.com/photo-1492681290082-e932934d49d4?auto=format&fit=crop&w=900&q=80', 'image/jpeg', 3);
}

console.log('seed complete');
