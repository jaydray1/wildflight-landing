# How to Add Blog Posts (Field Notes)

## Option 1: Using Sanity Studio (Recommended)

### If you have Sanity Studio set up elsewhere:

1. **Open your Sanity Studio** (either locally or at your hosted Studio URL)
2. **Navigate to the Content tab**
3. **Click "Create new"** → Select **"Field Note"**
4. **Fill in the fields:**
   - **Title**: Your article title
   - **Slug**: Click "Generate" to auto-create from title (or type manually)
   - **Excerpt**: Short description (optional but recommended)
   - **Published at**: Set the publish date/time
   - **Category**: Choose from dropdown (Technical, Roasting Notes, Field Guides, Batch Logs)
   - **Featured**: Toggle ON if you want this to appear as the featured article
   - **Main image**: Upload a featured image (optional)
   - **Content**: Write your article using the rich text editor

5. **Publish** the document
6. **Visit `/intel`** on your site to see it appear!

### If you need to set up Sanity Studio:

You can either:
- **Set up Studio in this project** (see Option 2 below)
- **Or use Sanity's hosted Studio** - Go to https://sanity.io/manage → Your project → Open Studio

---

## Option 2: Set Up Sanity Studio in This Project

If you want to manage content from this codebase:

1. **Install Sanity Studio**:
   ```bash
   npm install -D sanity @sanity/vision
   npx sanity init
   ```

2. **When prompted:**
   - Choose "Create new project" or "Use existing project"
   - Select your project
   - Choose where to put Studio files (you can create a `studio` folder)

3. **Add the fieldNote schema** to your Studio schemas folder (see `SANITY_SETUP.md` for the schema)

4. **Run the Studio**:
   ```bash
   npm run dev
   # or if Studio is in a separate folder:
   cd studio && npm run dev
   ```

---

## Option 3: Using Sanity's Management API (Programmatic)

You can also add posts programmatically using the Sanity client, but Studio is the easiest way for content creators.

---

## Quick Tips:

- **Slug format**: Should be lowercase with hyphens (e.g., `how-altitude-affects-brew`)
- **Featured article**: Only one article can be featured at a time (the query fetches the first one marked as featured)
- **Publish date**: Used to sort articles (newest first)
- **Content**: Supports rich text, code blocks, images, and more through Portable Text

---

## Testing:

After adding a post in Sanity:
1. Visit `http://localhost:3000/intel` to see all posts
2. Click on a post to view the full article at `/intel/[slug]`
3. Featured posts appear at the top of the list

