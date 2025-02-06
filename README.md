# Charlie Macnamara - Personal Website

My personal website showcasing my work as a Technical Writer and Developer. Built with Next.js, TailwindCSS, and MDX.

## Overview

This website serves as my professional portfolio and blog, where I share:
- Technical writing samples and API documentation
- Blog posts about software development and technical communication
- Projects and contributions to the developer community
- Insights about making complex technical concepts accessible

## Features

- **Responsive Design**: Optimized for all devices using TailwindCSS
- **Dark Mode**: System-aware theme switching
- **MDX Blog**: Technical articles with code syntax highlighting
- **Accessibility**: ARIA-compliant with semantic HTML
- **Performance**: Optimized images and lazy loading
- **SEO**: Meta tags and structured data for better visibility

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: TailwindCSS
- **Content**: MDX
- **Deployment**: Vercel
- **Media**: Optimized with Sharp
- **Performance Monitoring**: Custom implementation

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/CharlieMacnamara/Charlie-Webpage.git
cd Charlie-Webpage
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add any necessary environment variables.

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build and Deploy

To create a production build:

```bash
npm run build
npm run start
```

## Image Optimization

To optimize images for the web:

```bash
npm run optimize-images
```

This script will:
- Convert images to WebP format
- Optimize quality and file size
- Maintain aspect ratios
- Generate responsive sizes

## Contributing

While this is my personal website, I welcome:
- Bug reports
- Accessibility improvements
- Performance optimization suggestions

## Contact

- Email: macnamara.charlie@gmail.com
- LinkedIn: [Charlie Macnamara](https://www.linkedin.com/in/charliemacnamara/)
- GitHub: [@CharlieMacnamara](https://github.com/CharlieMacnamara)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
