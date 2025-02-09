import glob from 'fast-glob'
import fs from 'fs'
import path from 'path'

function importArticle(articleFilename) {
  const fullPath = path.join(process.cwd(), 'src', 'app', 'blog', articleFilename)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  
  // Extract article metadata using regex
  const metadataMatch = fileContents.match(/export const article = ({[\s\S]*?})/m)
  if (!metadataMatch) return null
  
  try {
    // Convert the metadata string to a valid JavaScript object
    const metadata = metadataMatch[1]
    // Create a function that will evaluate the metadata string in a safe context
    const evalMetadata = new Function(`return ${metadata}`)
    const article = evalMetadata()
    
    return {
      slug: articleFilename.replace(/(\/page)?\.mdx$/, ''),
      ...article,
    }
  } catch (e) {
    console.error(`Error parsing article metadata for ${articleFilename}:`, e)
    return null
  }
}

export function getAllArticles() {
  // Use sync version of glob
  const articleFilenames = glob.sync('*/page.mdx', {
    cwd: path.join(process.cwd(), 'src', 'app', 'blog'),
  })

  const articles = articleFilenames
    .map(importArticle)
    .filter(article => article !== null)

  return articles.sort((a, z) => new Date(z.date) - new Date(a.date))
}
