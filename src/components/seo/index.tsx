import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  type?: "website" | "article" | "product";
}

const SEO = ({
  title = "Smart Education - Browse Educational Products & Courses",
  description = "Discover a wide range of educational products, courses, and learning materials. Shop for electronics, accessories, and educational tools at Smart Education.",
  keywords = "education, learning, courses, products, electronics, educational tools, smart learning, online education",
}: SEOProps) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

export default SEO;
