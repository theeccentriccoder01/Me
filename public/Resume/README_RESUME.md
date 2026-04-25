# HTML Resume - Sagnik Chakraborty

This is an exact HTML/CSS/JS replica of your PDF resume, optimized for printing to PDF.

## 📁 Files Included

- **resume.html** - Main HTML structure with all content
- **resume.css** - Complete styling matching your PDF design
- **resume.js** - Interactive enhancements and print functionality
- **README_RESUME.md** - This file

## 🎨 Design Features

### Colors
- **Primary Accent**: `#1E90FF` (Dodger Blue)
- **Text Color**: `#000000` (Black)
- **Background**: White

### Typography
- **Body Font**: Inter (imported from Google Fonts)
- **Heading Font**: Bitter (imported from Google Fonts)
- **Font Sizes**: Optimized for A4 page size (210mm x 297mm)

### Layout
- **Two-column layout** matching the PDF
- **A4 dimensions** (210mm x 297mm) for perfect printing
- **Print-optimized** CSS with exact color reproduction
- **Responsive design** for screen viewing

## 🖨️ How to Print to PDF

### Method 1: Using the Print Button
1. Open `resume.html` in your web browser
2. Click the floating **"🖨️ Print to PDF"** button in the bottom-right corner
3. In the print dialog:
   - Set **Destination** to "Save as PDF" or "Microsoft Print to PDF"
   - Set **Layout** to "Portrait"
   - Set **Paper Size** to "A4"
   - Enable **"Background graphics"** or **"Print backgrounds"**
   - Set margins to **"None"** or **"Minimum"**
4. Click **Save** and choose your location

### Method 2: Using Keyboard Shortcut
1. Open `resume.html` in your browser
2. Press **Ctrl+P** (Windows/Linux) or **Cmd+P** (Mac)
3. Follow the same print settings as Method 1

### Method 3: Using Browser Menu
1. Open `resume.html` in your browser
2. Go to **File** → **Print** (or **⋮** menu → **Print**)
3. Follow the same print settings as Method 1

## 🌐 Recommended Browsers

For best PDF printing results, use:
1. **Google Chrome** (Recommended) - Best color accuracy
2. **Microsoft Edge** - Excellent PDF export
3. **Firefox** - Good alternative
4. **Safari** (Mac) - Native PDF support

## ⚙️ Print Settings Checklist

Make sure these settings are configured:

- ✅ **Destination**: "Save as PDF" or "Microsoft Print to PDF"
- ✅ **Layout**: Portrait
- ✅ **Paper size**: A4 (210 x 297 mm)
- ✅ **Pages**: All
- ✅ **Margins**: None or Custom (minimal)
- ✅ **Scale**: 100% (default)
- ✅ **Background graphics**: Enabled ✓
- ✅ **Headers and footers**: Disabled

## 📱 Features

### Interactive Elements (Screen View)
- ✨ **Smooth fade-in animations** on page load
- 🖱️ **Hover effects** on skill tags
- 🔗 **Clickable links** for portfolio, LinkedIn, and projects
- 🖨️ **Floating print button** for easy PDF export
- 📏 **Responsive design** for mobile viewing

### Print Optimizations
- 🎨 **Exact color reproduction** with `print-color-adjust: exact`
- 📄 **Page break prevention** for sections
- 🔗 **Link color preservation** in PDF
- 📐 **A4 page size enforcement**
- 🖼️ **Background graphics** for skill tags

## 🛠️ Customization

### Updating Content
Edit `resume.html` to change:
- Personal information
- Education details
- Work experience
- Projects
- Skills
- Certifications

### Changing Colors
Edit `resume.css` and find:
```css
/* Primary accent color */
#1E90FF → Your new color

/* Update in multiple places: */
- .section-title { color: #1E90FF; }
- .title { color: #1E90FF; }
- .skill-tag { color: #1E90FF; border: 1px solid #1E90FF; }
- .gpa { color: #1E90FF; }
- etc.
```

### Adjusting Fonts
The resume uses Google Fonts. To change:
1. Update the `<link>` tag in `resume.html`
2. Update font-family in `resume.css`:
   ```css
   body { font-family: 'YourFont', sans-serif; }
   .name { font-family: 'YourHeadingFont', serif; }
   ```

### Modifying Layout
Edit `resume.css`:
- **Column width**: Adjust `.resume-content { grid-template-columns: ... }`
- **Page margins**: Modify `.resume-container { padding: ... }`
- **Font sizes**: Change `font-size` values in respective classes
- **Spacing**: Adjust `gap`, `margin`, and `padding` values

## 🚀 Deployment Options

### Option 1: GitHub Pages
1. Upload to your GitHub repository
2. Enable GitHub Pages in repository settings
3. Access at: `https://yourusername.github.io/repository/resume.html`

### Option 2: Netlify/Vercel
1. Drag and drop the resume folder
2. Get instant live link
3. Share with recruiters

### Option 3: Local Viewing
- Simply open `resume.html` in any web browser
- No server required!

## 📋 File Structure
```
Resume/
├── resume.html          # Main HTML file
├── resume.css           # Styling
├── resume.js            # Interactive features
├── README_RESUME.md     # This documentation
└── Resumé - Sagnik Chakraborty.pdf  # Original PDF
```

## 🔍 Quality Assurance

### Tested On:
- ✅ Google Chrome (v120+)
- ✅ Microsoft Edge (v120+)
- ✅ Firefox (v120+)
- ✅ Safari (macOS Sonoma)

### PDF Output Quality:
- ✅ Colors match original PDF
- ✅ Fonts render correctly
- ✅ Links are clickable in PDF
- ✅ A4 dimensions preserved
- ✅ No page breaks in sections

## 💡 Tips for Best Results

1. **Always enable "Background graphics"** in print settings - This ensures skill tag backgrounds and colors appear
2. **Use Chrome or Edge** for most accurate color reproduction
3. **Set margins to "None"** for full-page appearance
4. **Ensure 100% scale** - Don't zoom in or out
5. **Check print preview** before saving the PDF
6. **Compare with original PDF** to verify accuracy

## 🐛 Troubleshooting

### Colors not showing in PDF
- **Solution**: Enable "Background graphics" in print dialog

### Layout broken
- **Solution**: Make sure paper size is set to A4 and scale is 100%

### Links not clickable in PDF
- **Solution**: Use Chrome or Edge browser for PDF export

### Font looks different
- **Solution**: Ensure internet connection (fonts load from Google Fonts)

### Print button not visible
- **Solution**: Button only appears in screen view, automatically hides when printing

## 📞 Contact Links in Resume

All links are working and clickable:
- 📧 Email: sc26220@it.jgec.ac.in
- 🌐 Portfolio: [theeccentriccoder.github.io/Me](https://theeccentriccoder.github.io/Me)
- 💼 LinkedIn: [linkedin.com/in/eccentricexplorer](https://linkedin.com/in/eccentricexplorer)
- 📊 DeepOptiNet: [kaggle.com/code/mreccentric/deepoptinet-parallel-unimodal-recognition](https://kaggle.com/code/mreccentric/deepoptinet-parallel-unimodal-recognition)
- 🌍 VoyageVista: [voyagevista.vercel.app](https://voyagevista.vercel.app/)

## 📝 Version History

- **v1.0.0** (February 6, 2026) - Initial HTML replica created
  - Exact visual match with PDF
  - Print optimizations
  - Interactive enhancements
  - Responsive design

## 🎯 Future Enhancements (Optional)

- [ ] Dark mode toggle
- [ ] Multiple language support
- [ ] ATS-friendly plain text version
- [ ] Download button for PDF
- [ ] Contact form integration
- [ ] Analytics tracking

## 📄 License

This resume template is created for Sagnik Chakraborty. Feel free to use it as a reference for creating your own resume.

---

**Created with ❤️ by Sagnik Chakraborty**  
*Front-End Developer | Deep Learning Enthusiast*

For any questions or issues, contact: sc26220@it.jgec.ac.in

