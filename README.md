# GCP Data Engineering Flip Card

An interactive flip-card microsite that condenses the `notes.md` cheat sheet into bite-sized prompts. Banner tag: **KodeKloud**.

## Clean up Docker before rebuilding
**Always run this before building a new image to ensure a clean state:**

```bash
# Stop all running containers
docker stop $(docker ps -aq) 2>/dev/null || true

# Remove all containers
docker rm $(docker ps -aq) 2>/dev/null || true

# Remove all images
docker rmi $(docker images -q) -f 2>/dev/null || true

# Remove all volumes
docker volume rm $(docker volume ls -q) 2>/dev/null || true

# Remove all networks (except default ones)
docker network prune -f

# Clean up build cache and dangling images
docker system prune -af --volumes
```

## Run locally with Docker
1. **Build the image:**
   ```bash
   docker build -t gcp-flip-card .
   ```

2. **Run the container** (serves on port 8080):
   ```bash
   docker run --name gcp-flip-card -p 8080:80 gcp-flip-card
   ```

3. **Open the site:** http://localhost:8080

4. **To stop the container:**
   ```bash
   docker stop gcp-flip-card
   ```

## Project structure
- `index.html` – Flip card layout and content distilled from `notes.md`
- `style.css` – Styling for banner, grid, and flip animation
- `script.js` – Click/keyboard flip interactions
- `data/questions.json` – Question bank derived from `notes.md`
- `Dockerfile` – Nginx-based static site image
- `notes.md` – Source cheat sheet content

## Refresh feature
- Press the `Refresh Cards` button to shuffle and pull in new questions while letting you reattempt familiar ones. Questions may repeat to reinforce hot topics.

## Editing content
Update the text inside `index.html` if you want to tweak the flashcards, then rebuild the Docker image. No additional build tools are required.

