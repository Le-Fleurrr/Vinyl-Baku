import { useState } from "react";
import { VinylRecord } from "../components/VinylRecord.tsx";
import { Button } from "../components/ui/Button.tsx";
import { ShoppingCart, Heart } from "lucide-react";
import { albums } from "./Albums.jsx";
import { Link } from "react-router-dom";

export const Collections = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="container mx-auto px-6 py-12">
        <Link to="/" className="text-primary hover:underline mb-4 inline-block">
          ← Geri
        </Link>
        
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
            Bütün Kolleksiya
          </h1>
          <p className="text-muted-foreground text-lg">
            {albums.length} vinil qeydimizi kəşf edin
          </p>
        </div>

        {/* Albums Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {albums.map((album) => (
            <div
              key={album.id}
              className="group relative bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer"
              onMouseEnter={() => setHoveredId(album.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* New Badge */}
              {album.isNew && (
                <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full z-10">
                  YENI
                </span>
              )}

              {/* Vinyl Visual with Album Art */}
              <div className="relative h-48 flex items-center justify-center mb-6">
                {/* Album cover background - FIXED POSITION */}
                {album.image && (
                  <div className="absolute inset-0 flex items-center justify-start pl-4">
                    <div className="w-40 h-40 rounded-lg overflow-hidden shadow-xl">
                      <img 
                        src={album.image} 
                        alt={`${album.title} cover`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
                
                {/* Background decorative gradient */}
                <div className="absolute w-40 h-40 bg-gradient-to-br from-primary/20 to-transparent rounded-lg transform -rotate-6" />
                
                {/* Vinyl disc - MOVES on hover */}
                <div 
                  className={`relative transition-transform duration-500 ease-out ${
                    hoveredId === album.id ? "translate-x-16" : "translate-x-0"
                  }`}
                  style={{ marginLeft: '20px' }}
                >
                  <VinylRecord 
                    size="md" 
                    spinning={hoveredId === album.id}
                    vinylColor={album.vinylColor}
                  />
                </div>
              </div>

              {/* Info */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold group-hover:text-primary transition-colors">
                      {album.title}
                    </h3>
                    <p className="text-muted-foreground">{album.artist}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary shrink-0">
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="px-2 py-1 bg-secondary rounded">{album.genre}</span>
                  <span>•</span>
                  <span>{album.year}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <p className="text-2xl font-serif font-bold">{album.price} ₼</p>
                  <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};