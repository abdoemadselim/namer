"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Stars, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { arabicNames } from "@/data/arabicNames";
import { ScrollArea } from "@/components/ui/scroll-area"

export default function NameGenerator() {
  const [currentName, setCurrentName] = useState({ name: "", meaning: "" });
  const [isBoyName, setIsBoyName] = useState(true);
  const [favorites, setFavorites] = useState<Array<{ name: string; meaning: string; gender: string }>>([])

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoritesNames")
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  const generateName = (isBoyName: boolean) => {
    const names = isBoyName ? arabicNames.boy : arabicNames.girl;
    const randomIndex = Math.floor(Math.random() * names.length);
    setCurrentName(names[randomIndex]);
  };

  const toggleFavorite = (name: { name: string; meaning: string }) => {
    const newFavorites = favorites.some((fav) => fav.name === name.name)
      ? favorites.filter((fav) => fav.name !== name.name)
      : [...favorites, { ...name, gender: isBoyName ? "boy" : "girl" }]

    setFavorites(newFavorites)
    localStorage.setItem("favoritesNames", JSON.stringify(newFavorites))
  }

  const changeGender = () => {
    setIsBoyName(!isBoyName);
    generateName(!isBoyName)
  }

  const isFavorite = (name: string) => favorites.some((fav) => fav.name === name)

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-yellow-100 flex items-center justify-center overflow-hidden">
      <AnimatedStars />
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm relative">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-orange-600">
            مقترح الأسماء &#x2764;
          </CardTitle>
          <CardDescription className="text-lg text-orange-500">
            اختر الاسم الأمثل لنجمك الصغير! ✨
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <Label
              htmlFor="gender-toggle"
              className={isBoyName ? "text-blue-500" : "text-pink-500"}>
              {isBoyName ? "ولد" : "بنت"}
            </Label>
            <Switch
              id="gender-toggle"
              checked={!isBoyName}
              onCheckedChange={() => changeGender()}
              className="data-[state=checked]:bg-pink-500 data-[state=unchecked]:bg-blue-500"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <Moon className="text-yellow-500 w-24 h-24" />
              <Sun className="text-orange-500 w-32 h-32" />
            </div>
            <motion.div
              className="relative bg-orange-50 rounded-lg p-6 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentName.name}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}>
                  <h2
                    className={`text-4xl font-bold mb-2 ${
                      isBoyName ? "text-blue-600" : "text-pink-600"
                    }`}>
                    {currentName.name || "???"}
                  </h2>
                  <p className="text-lg text-orange-600 mt-2">
                    {currentName.meaning || "اسم صغيرك"}
                  </p>
                  {currentName.name && (
                    <Button variant="ghost" size="sm" className="mt-2" onClick={() => toggleFavorite(currentName)}>
                      <Heart
                        className={`h-5 w-5 ${isFavorite(currentName.name) ? "fill-red-500 text-red-500" : "text-gray-500"}`}
                      />
                    </Button>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => generateName(isBoyName)}
              className="w-full bg-gradient-to-r text-lg text-blue-950 from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500">
              <Stars className="mr-2 h-4 w-4" />
              اختر اسم
            </Button>
          </motion.div>
          <div className="mt-6">
            <h3 className="text-xl text-end mt-10 font-semibold text-orange-600 mb-2">اسماء مفضلة</h3>
            <ScrollArea className="h-[200px] w-full rounded-md border p-1">
              {favorites.length === 0 ? (
                <p className="text-center text-gray-500 px-5">لا توجد أسماء مفضلة بعد. اضغط على القلب لإضافة اسم هنا! ❤️</p>
              ) : (
                favorites.map((fav, index) => (
                  <div key={index} className="flex flex-row-reverse justify-between items-center mb-2 text-end px-2">
                    <div>
                      <span className={`font-semibold ${fav.gender === "boy" ? "text-blue-600" : "text-pink-600"}`}>
                        {fav.name}
                      </span>
                      <span className="text-sm text-gray-600 ml-2">- {fav.meaning}</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => toggleFavorite(fav)}>
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    </Button>
                  </div>
                ))
              )}
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AnimatedStars() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-yellow-300"
          initial={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            scale: 0,
          }}
          animate={{
            top: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            left: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}>
          <Stars size={Math.random() * 16 + 8} />
        </motion.div>
      ))}
    </div>
  );
}
