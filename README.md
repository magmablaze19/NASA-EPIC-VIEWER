# NASA EPIC Photo Viewer

A web application that displays high-resolution Earth images captured by NASA's EPIC (Earth Polychromatic Imaging Camera), allowing users to select a date and scrub through images with a slider interface.
I built it using a react front end and a nodejs + express backend. The backend and front end collect the EPIC data used from NASA's open apis. More details at api.nasa.gov.

## Live Demo
The site is deployed on vercel for the front end, and render for the backend. You can view a live demo with the link below or in the sidebar.

[https://nasa-demo.vercel.app](https://nasa-epic-viewer.vercel.app/)

## Features

- Select any date to view EPIC satellite images of Earth
- Slider lets you manually scrub through all available images for that day

## Getting Started

If you would like to run the site locally, follow the steps below:

### 1. Clone the Repository

```
https://github.com/magmablaze19/NASA-EPIC-VIEWER.git
cd NASAdemo
```

### 2. Set Up the Backend

```
cd backend
npm install
```

Create a `.env` file in `backend/` with your NASA API key using the following structure:

```
API_KEY=your_nasa_api_key_here
PORT=5000
```

Then start the backend server:

```
npm run start
```

### 3. Set Up the Frontend

In a separate terminal:

```
cd frontend
npm install
```

Create a `.env` file in `frontend/` with your backend URL using the format below:

```
REACT_APP_BACKEND_URL=localhost:5000 (or whatever URL you are using to host backend)
```

Then start the React app:

```
npm start
```

## NASA API Key

You can obtain your own free API key from [https://api.nasa.gov](https://api.nasa.gov).  
This is required for the software to run properly. You can try using the API key DEMO_KEY but this is untested.

## Known Issues

- Image preloading seems to be substantially slower on Windows. Linux, android, and IOS platforms seem to load normally. Wait until first image has fully rendered before attempting to use the slider bar.
- The API returns no data on some days, I checked with the official viewer and that appears to be due to missing data for that day.

## Contact

Made by [Alexandre Passin](https://github.com/magmablaze19)

---

## Credits

- [NASA EPIC API](https://epic.gsfc.nasa.gov/)
- [NASA Open APIs](https://api.nasa.gov)
