- Player (sidebar) - always running
  - Current Episode
    - Title
    - Description
    - other stuff

- Show
  - id
  - Owner/s
  - Show name
  - Time
    - DayOfWeek
    - Time
    - Length
  - Show length (30 / 60)
  - Show description
  - Show episodes

- Episode
  - showId
  - id
  - name
  - (opt) description
  - tracklist - [...songIDs]

- Songs
  - id
  - name
  - artist

- Schedule
  - Episode ID
  - Timestamp - day/month/year, time, everything
  - Length

# Historical Use Case

User --> goes to a date --> selects show --> sees tracklist


- users
  - unauthed --> listeners
  - dj's
    - access to THEIR show
    - need to create episodes
  - admin
    - creates the shows


# API structure

/api/currentEpisode
  {
    showName,
    showDescription
    episodeName,
    episodeDescription,
    timestamp (start),
    length,
  }

/api/schedule
  []
  {
    showName,
    showDescription
    episodeName,
    episodeDescription,
    timestamp (start),
    length,
  }

/api/episode/
