import React from "react";
import Image from "../Components/Image";

const Comment = () => {
  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-8">
      <div className="flex items-center gap-2">
        <Image
          src="userImg.jpeg"
          className="w-12 h-12 rounded-full object-cover"
          width={48}
          height={48}
          alt="User"
        />
        <span>John Doe</span>
        <span className="text-sm text-gray-500">2 days ago</span>
      </div>
      <div className="mt-4">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
          aperiam iusto explicabo nesciunt cumque rerum, voluptatibus
          consequuntur magni autem consequatur blanditiis atque velit, ducimus
          ratione ex tempora repudiandae pariatur libero.
        </p>
      </div>
    </div>
  );
};

export default Comment;
 