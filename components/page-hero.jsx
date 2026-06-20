import { Breadcrumb } from "@/components/ui/breadcrumb"

export function PageHero({ title, description, breadcrumbItems, backgroundImage, children }) {
  return (
    <section
      className="relative bg-gray-50 py-16 md:py-24"
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {}
      }
    >
      <div className="container mx-auto px-4">
        {breadcrumbItems && (
          <Breadcrumb items={breadcrumbItems} className={backgroundImage ? "text-white/80" : "mb-6"} />
        )}
        <div className="max-w-3xl">
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${backgroundImage ? "text-white" : "text-foreground"}`}
          >
            {title}
          </h1>
          {description && (
            <p
              className={`text-lg md:text-xl leading-relaxed ${backgroundImage ? "text-white/90" : "text-muted-foreground"}`}
            >
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  )
}
