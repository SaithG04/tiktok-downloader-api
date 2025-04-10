
# TikTok Downloader API

This is the back-end API for the TikTok Downloader application, which allows users to download TikTok videos.

## Features

- Accepts a POST request with a TikTok video URL.
- Resolves mobile URLs for TikTok (e.g., vm.tiktok.com).
- Cleans the provided URL before passing it to SnapTikClient for processing.
- Returns the video sources available for download.

## Installation

To set up this server locally, follow these steps:

### 1. Clone the repository:

```bash
git clone https://github.com/yourusername/tiktok-downloader-api.git
cd tiktok-downloader-api
```

### 2. Install the required dependencies:

```bash
npm install
```

### 3. Start the server:

```bash
npm start
```

The server will be available at `http://localhost:3000`.

## API Endpoints

### `POST /download`

- **Description**: Receives a TikTok video URL, cleans it, and returns the video sources.
- **Request Body**:
    - `url` (string): The TikTok video URL.
- **Response**:
    - If successful: Returns a JSON object with the video sources.
    - If there is an error: Returns a JSON object with the error message.

**Example Request**:

```json
{
  "url": "https://www.tiktok.com/@username/video/1234567890123456789"
}
```

**Example Response**:

```json
{
  "data": {
    "sources": [
      {
        "url": "https://video-source-url.mp4",
        "quality": "1080p"
      },
      {
        "url": "https://video-source-url-2.mp4",
        "quality": "720p"
      }
    ]
  }
}
```

### Error Handling

- If no URL is provided: `400 Bad Request` with an error message.
- If an internal error occurs: `500 Internal Server Error` with a message indicating the error.

## Technologies Used

- **Express.js**: Web framework for Node.js.
- **Axios**: For making HTTP requests to resolve mobile TikTok URLs.
- **SnapTikClient**: Custom client for processing and retrieving video sources from TikTok.

## License

This project is licensed under the MIT License.

## Contributing

Feel free to fork this repository and submit pull requests to improve the functionality.

