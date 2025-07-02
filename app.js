import supabase from './supabase.js';

// DOM elements (keep all your existing element references)

// Initialize the app
async function init() {
  await loadWebinars();
  populateMonthFilter();
  updateSummaryStats();

  // Set current date/time as default
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60000;
  const localISOTime = new Date(now - timezoneOffset)
    .toISOString()
    .slice(0, 16);
  document.getElementById('webinarDateTime').value = localISOTime;
}

// Load webinars from Supabase
async function loadWebinars() {
  const { data, error } = await supabase
    .from('webinars')
    .select('*')
    .order('date_time', { ascending: false });

  if (error) {
    console.error('Error loading webinars:', error);
    return;
  }

  webinars = data;
  renderWebinarList();
}

// Form submission
webinarForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const webinar = {
    name: document.getElementById('webinarName').value,
    date_time: document.getElementById('webinarDateTime').value,
    duration: parseInt(document.getElementById('webinarDuration').value),
    registrants: parseInt(document.getElementById('webinarRegistrants').value),
    attendees: parseInt(document.getElementById('webinarAttendees').value),
  };

  const { data, error } = await supabase
    .from('webinars')
    .insert([webinar])
    .select();

  if (error) {
    console.error('Error saving webinar:', error);
    alert('Error saving webinar. Please check console for details.');
    return;
  }

  webinars.unshift(data[0]);
  webinarForm.reset();
  renderWebinarList();
  updateSummaryStats();
  populateMonthFilter();
});

// Delete webinar
window.deleteWebinar = async function (id) {
  if (!confirm('Are you sure you want to delete this webinar?')) return;

  const { error } = await supabase.from('webinars').delete().eq('id', id);

  if (error) {
    console.error('Error deleting webinar:', error);
    alert('Error deleting webinar. Please check console for details.');
    return;
  }

  webinars = webinars.filter((w) => w.id !== id);
  renderWebinarList();
  updateSummaryStats();
  populateMonthFilter();
};

// Keep all your existing rendering and helper functions (renderWebinarList, populateMonthFilter, updateSummaryStats, etc.)
// Only change the date/time references from dateTime to date_time to match Supabase column names

// Initialize the app
init();
