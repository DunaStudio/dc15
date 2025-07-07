import { MessageCircle } from "lucide-react";

export default function WspButton() {
  return (
    <div className="group bg-[#25D366] rounded-full p-2 fixed bottom-6 right-6 z-50 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle
          size={24}
          className="text-white group-hover:scale-110 transition-transform duration-200"
        />
      </a>
    </div>
  );
}
