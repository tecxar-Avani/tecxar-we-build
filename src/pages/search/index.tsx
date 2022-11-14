import ProfileCard from "@/components/Profile";
import React from "react";

const SearchPage = () => {
  const profiledata = {
    title: "Mazza Konny",
    editIcon: "editIcon.svg",
    dateOfJoined: "Date joined: Oct 2022",
    boxLeftTitle: "Boxes",
    boxValueLeft: "4",
    profileImg: "Ellipse60.png",
    bottomTitle: "all the city with me",
    boxRightTitle: "Awareness",
    boxValueRight: "15",
    flashCardProfile: "flashCardProfile.svg",
  };

  return (
    <>
      <div>
        <ProfileCard profile={profiledata} />
      </div>
      <div>
        <ProfileCard profile={profiledata} />
      </div>
      <div>
        <ProfileCard profile={profiledata} />
      </div>
    </>
  );
};

export default SearchPage;
