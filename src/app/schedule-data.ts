export interface LibraryEvent {
  guid: string;
  weekday: 1 | 2 | 3 | 4 | 5;
  title: string;
  start: string;
  end: string;
  color: string;
}

export const libraryEvents: LibraryEvent[] = [
  {
    "guid": "baley",
    "weekday": 1,
    "title": "Baley Library",
    "start": "08:30",
    "end": "09:00",
    "color": "#fff2cc"
  },
  {
    "guid": "hunter",
    "weekday": 1,
    "title": "Hunter\nLibrary",
    "start": "10:10",
    "end": "10:40",
    "color": "#fce5cd"
  },
  {
    "guid": "lunch-mon",
    "weekday": 1,
    "title": "Lunch",
    "start": "11:25",
    "end": "11:55",
    "color": "#ccc"
  },
  {
    "guid": "quinn",
    "weekday": 1,
    "title": "Quinn\nLibrary",
    "start": "11:55",
    "end": "12:25",
    "color": "#d9ead3"
  },
  {
    "guid": "james",
    "weekday": 1,
    "title": "James\nLibrary",
    "start": "12:45",
    "end": "13:15",
    "color": "#fff2cc"
  },
  {
    "guid": "robinson",
    "weekday": 1,
    "title": "Robinson\nLibrary",
    "start": "13:35",
    "end": "14:05",
    "color": "#c9daf8"
  },
  {
    "guid": "karlin",
    "weekday": 2,
    "title": "Karlin Library",
    "start": "08:30",
    "end": "09:00",
    "color": "#fce5cd"
  },
  {
    "guid": "lambert",
    "weekday": 2,
    "title": "Lambert\nLibrary",
    "start": "09:00",
    "end": "09:30",
    "color": "#d9ead3"
  },
  {
    "guid": "lunch-tue",
    "weekday": 2,
    "title": "Lunch",
    "start": "11:25",
    "end": "11:55",
    "color": "#ccc"
  },
  {
    "guid": "steam-tue",
    "weekday": 2,
    "title": "Closed for\nSTEAM",
    "start": "11:55",
    "end": "14:30",
    "color": "#b7b7b7"
  },
  {
    "guid": "jans",
    "weekday": 3,
    "title": "Jans Library",
    "start": "08:30",
    "end": "09:00",
    "color": "#fce5cd"
  },
  {
    "guid": "larsen",
    "weekday": 3,
    "title": "Larsen\nLibrary",
    "start": "09:20",
    "end": "09:50",
    "color": "#c9daf8"
  },
  {
    "guid": "beasley",
    "weekday": 3,
    "title": "Beasley\nLibrary",
    "start": "10:10",
    "end": "10:40",
    "color": "#f4cccc"
  },
  {
    "guid": "lunch-wed",
    "weekday": 3,
    "title": "Lunch",
    "start": "11:25",
    "end": "11:55",
    "color": "#ccc"
  },
  {
    "guid": "crateau",
    "weekday": 3,
    "title": "Crateau\nLibrary",
    "start": "11:55",
    "end": "12:25",
    "color": "#fff2cc"
  },
  {
    "guid": "raleigh",
    "weekday": 3,
    "title": "Raleigh\nLibrary",
    "start": "13:35",
    "end": "14:05",
    "color": "#f4cccc"
  },
  {
    "guid": "patching",
    "weekday": 4,
    "title": "Patching\nHomeroom Library",
    "start": "08:05",
    "end": "08:50",
    "color": "#d5a6bd"
  },
  {
    "guid": "wilson",
    "weekday": 4,
    "title": "Wilson\nHomeroom Library",
    "start": "09:00",
    "end": "09:30",
    "color": "#b4a7d6"
  },
  {
    "guid": "ordeman",
    "weekday": 4,
    "title": "Ordeman\nLibrary",
    "start": "10:10",
    "end": "10:40",
    "color": "#d9ead3"
  },
  {
    "guid": "lunch-thu",
    "weekday": 4,
    "title": "Lunch",
    "start": "11:25",
    "end": "11:55",
    "color": "#ccc"
  },
  {
    "guid": "steam-thu",
    "weekday": 4,
    "title": "Closed for\nSTEAM",
    "start": "11:55",
    "end": "14:30",
    "color": "#b7b7b7"
  },
  {
    "guid": "olson",
    "weekday": 5,
    "title": "Olson/Wydronek\nHomeroom Library",
    "start": "08:05",
    "end": "08:50",
    "color": "#d5a6bd"
  },
  {
    "guid": "perdue",
    "weekday": 5,
    "title": "Perdue/Young\nHomeroom Library",
    "start": "09:00",
    "end": "09:30",
    "color": "#b4a7d6"
  },
  {
    "guid": "unrein",
    "weekday": 5,
    "title": "Unrein\nLibrary",
    "start": "10:10",
    "end": "10:40",
    "color": "#f4cccc"
  },
  {
    "guid": "lunch-fri",
    "weekday": 5,
    "title": "Lunch",
    "start": "11:20",
    "end": "11:50",
    "color": "#ccc"
  },
  {
    "guid": "apple",
    "weekday": 5,
    "title": "Apple Library",
    "start": "12:45",
    "end": "13:15",
    "color": "#c9daf8"
  }
];