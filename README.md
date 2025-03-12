# Spotify-clone

## Overview
This is a JavaScript-based music player web application that fetches and plays songs from a local server. It dynamically displays available albums, lists songs, and provides playback controls.

## Features
- Fetches and displays songs from a given folder.
- Displays albums with metadata (title, description, and cover image).
- Allows users to play, pause, skip, and seek through songs.
- Supports volume control and muting.
- Displays current playback time and song duration.
- Responsive UI with a sidebar for navigation.

## Screenshot
![image](https://github.com/user-attachments/assets/e2388665-101b-4554-81e4-eb77f8e1ff26)


## Installation & Setup
### Prerequisites
- A local server running at `http://127.0.0.1:3000/` with song files stored in `assests/audio/`.
- JSON metadata files (`info.json`) inside each album folder with album details.

### Running the Project
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```
2. Start a local server (e.g., using Python's SimpleHTTPServer):
   ```bash
   python -m http.server 3000
   ```
3. Open `index.html` in your browser.

## File Structure
```
/assests/
  ├── audio/
  │   ├── album1/
  │   │   ├── song1.mp3
  │   │   ├── song2.mp3
  │   │   ├── cover.jpeg
  │   │   ├── info.json
  │   ├── album2/
  │   │   ├── song3.mp3
  │   │   ├── cover.jpeg
  │   │   ├── info.json
  ├── images/
  │   ├── music.svg
  │   ├── play.svg
  │   ├── pause.svg
  │   ├── volume.svg
  │   ├── mute.svg
```

## Usage
1. **Loading Albums:** The app fetches and displays albums from `assests/audio/`.
2. **Playing Songs:** Click on an album to view its songs, then click on a song to play.
3. **Playback Controls:** Use play, pause, next, previous, and seek functionalities.
4. **Volume Control:** Adjust or mute/unmute the volume.
5. **Navigation:** Use the hamburger menu to open/close the sidebar.

## API Endpoints
The app fetches songs and album data using the following endpoints:
- `http://127.0.0.1:3000/<folder>/` - Fetches song files from a folder.
- `http://127.0.0.1:3000/assests/audio/<album>/info.json` - Fetches metadata for an album.

## Troubleshooting
- Ensure the local server is running on port `3000`.
- Check if song files and metadata exist in the correct folder structure.
- Use browser console (`F12 -> Console`) to check for errors.

## License
This project is open-source under the MIT License.

