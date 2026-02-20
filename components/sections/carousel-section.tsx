
import { ScrollObserver } from "@/components/ui/scroll-observer"
import { ImageCarousel } from "@/components/ui/image-carousel"

export default function CarouselSection() {
  const studentLifeImages = [
    {
      src: "/carousel-student-life-1.jpg",
      alt: "Student Life 1",
      title: "Making Friends & Memories",
    },
    {
      src: "/carousel-student-life-2.jpg",
      alt: "Student Life 2",
      title: "Building Leadership",
    },
    {
      src: "/carousel-student-life-3.jpg",
      alt: "Student Life 3",
      title: "Growing Together",
    },
    {
      src: "/carousel-student-life-4.jpg",
      alt: "Student Life 4",
      title: "Excellence in All Endeavors",
    },
  ]

  const admissionHighlights = [
    {
      src: "/carousel-admission-process.jpg",
      alt: "Admission Process",
      title: "Simple Admission Process",
    },
    {
      src: "/carousel-campus-tour.jpg",
      alt: "Campus",
      title: "Modern Campus",
    },
    {
      src: "/carousel-scholarship.jpg",
      alt: "Scholarship",
      title: "Scholarships Available",
    },
  ]

  return (
    <section className=" bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* First Carousel - Student Life */}
        <ScrollObserver className="mb-20">
          <h2 className="text-4xl font-playfair font-bold text-primary mb-4">Student Life</h2>
          <p className="text-muted-foreground mb-8">Experience the vibrant life at St Pius School</p>
          <ImageCarousel images={studentLifeImages} autoPlay={true} interval={6000} className="h-96 md:h-[500px]" />
        </ScrollObserver>

        {/* Second Carousel - Admission */}
        <ScrollObserver>
          <h2 className="text-4xl font-playfair font-bold text-primary mb-4">Why Join Us?</h2>
          <p className="text-muted-foreground mb-8">Discover what makes St Pius the right choice</p>
          <ImageCarousel images={admissionHighlights} autoPlay={true} interval={5000} className="h-96 md:h-[500px]" />
        </ScrollObserver>
      </div>
    </section>
  )
}
