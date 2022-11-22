import FlashCardModal from "@/components/FlashCardModal";
import HeaderTitle from "@/components/headerTitle";
import ProfileCard from "@/components/Profile";
import VideoCard from "@/components/VideoCard";
import { Button } from "antd";
import { useAppDispatch } from "hooks";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
// import { getVideoCard } from "../../store/reducers/videoCard.reducer";

const Profile = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getVideoCard());
  // });

  const videosData = [
    {
      type: "video",
      title: "Justin Bieber - Peaches ft. Daniel Caesar, Giveon",
      id: "tQ0yjYUFKAE",
      url: "https://www.youtube.com/watch?v=tQ0yjYUFKAE",
      bestThumbnail: {
        url: "https://i.ytimg.com/vi/tQ0yjYUFKAE/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLC0VM5eqzf0t-LYhkYTP9XlcMkZfQ",
        width: 720,
        height: 404,
      },
      thumbnails: [
        {
          url: "https://i.ytimg.com/vi/tQ0yjYUFKAE/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLC0VM5eqzf0t-LYhkYTP9XlcMkZfQ",
          width: 720,
          height: 404,
        },
        {
          url: "https://i.ytimg.com/vi/tQ0yjYUFKAE/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLB7kZWK4H36Qr84b8i8Cpj6h-R3pg",
          width: 360,
          height: 202,
        },
      ],
      isUpcoming: false,
      upcoming: null,
      isLive: false,
      badges: ["CC"],
      author: {
        name: "Justin Bieber",
        channelID: "UCIwFjwMjI0y7PDBVEO9-bkQ",
        url: "https://www.youtube.com/channel/UCIwFjwMjI0y7PDBVEO9-bkQ",
        bestAvatar: {
          url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
          width: 68,
          height: 68,
        },
        avatars: [
          {
            url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
            width: 68,
            height: 68,
          },
        ],
        ownerBadges: ["Official Artist Channel"],
        verified: true,
      },
      description: null,
      views: 599514600,
      duration: "3:18",
      uploadedAt: "1 year ago",
    },
    {
      type: "video",
      title: "Justin Bieber - Ghost",
      id: "Fp8msa5uYsc",
      url: "https://www.youtube.com/watch?v=Fp8msa5uYsc",
      bestThumbnail: {
        url: "https://i.ytimg.com/vi/Fp8msa5uYsc/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBy5JMMfllCtppR2CS4kx_WHgzEZg",
        width: 720,
        height: 404,
      },
      thumbnails: [
        {
          url: "https://i.ytimg.com/vi/Fp8msa5uYsc/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBy5JMMfllCtppR2CS4kx_WHgzEZg",
          width: 720,
          height: 404,
        },
        {
          url: "https://i.ytimg.com/vi/Fp8msa5uYsc/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDMsVAYqU5pE9fswJyGq_QhhRsfzw",
          width: 360,
          height: 202,
        },
      ],
      isUpcoming: false,
      upcoming: null,
      isLive: false,
      badges: ["CC"],
      author: {
        name: "Justin Bieber",
        channelID: "UCIwFjwMjI0y7PDBVEO9-bkQ",
        url: "https://www.youtube.com/channel/UCIwFjwMjI0y7PDBVEO9-bkQ",
        bestAvatar: {
          url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
          width: 68,
          height: 68,
        },
        avatars: [
          {
            url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
            width: 68,
            height: 68,
          },
        ],
        ownerBadges: ["Official Artist Channel"],
        verified: true,
      },
      description: null,
      views: 201320152,
      duration: "3:33",
      uploadedAt: "1 year ago",
    },
    {
      type: "video",
      title:
        "Best of Justin Bieber 2022   Justin Bieber Greatest Hits Full Album 2022",
      id: "pPjaM99O0OY",
      url: "https://www.youtube.com/watch?v=pPjaM99O0OY",
      bestThumbnail: {
        url: "https://i.ytimg.com/vi/pPjaM99O0OY/hq720.jpg?sqp=-oaymwExCNAFEJQDSFryq4qpAyMIARUAAIhCGAHwAQH4Af4JgALQBYoCDAgAEAEYZSBUKGIwDw==&rs=AOn4CLBUfijYaqER8EZi4QRshiPh1xrPzQ",
        width: 720,
        height: 404,
      },
      thumbnails: [
        {
          url: "https://i.ytimg.com/vi/pPjaM99O0OY/hq720.jpg?sqp=-oaymwExCNAFEJQDSFryq4qpAyMIARUAAIhCGAHwAQH4Af4JgALQBYoCDAgAEAEYZSBUKGIwDw==&rs=AOn4CLBUfijYaqER8EZi4QRshiPh1xrPzQ",
          width: 720,
          height: 404,
        },
        {
          url: "https://i.ytimg.com/vi/pPjaM99O0OY/hq720.jpg?sqp=-oaymwE9COgCEMoBSFryq4qpAy8IARUAAAAAGAElAADIQj0AgKJDeAHwAQH4Af4JgALQBYoCDAgAEAEYZSBUKGIwDw==&rs=AOn4CLDj46iCjgaVeB6_zGmwC_wdsTSXxw",
          width: 360,
          height: 202,
        },
      ],
      isUpcoming: false,
      upcoming: null,
      isLive: false,
      badges: [],
      author: {
        name: "Musicas Internacionais",
        channelID: "UC9enO-No2yIhd3Rbcog4dHw",
        url: "https://www.youtube.com/@musicasinternacionais3130",
        bestAvatar: {
          url: "https://yt3.ggpht.com/d_2G9C7hBRjaqtY2awTaju1nAh5lbNfbyGYA4zkug7FYpj2pqfGSGb3bZ7kaZxl7UcKQH6yP=s68-c-k-c0x00ffffff-no-rj",
          width: 68,
          height: 68,
        },
        avatars: [
          {
            url: "https://yt3.ggpht.com/d_2G9C7hBRjaqtY2awTaju1nAh5lbNfbyGYA4zkug7FYpj2pqfGSGb3bZ7kaZxl7UcKQH6yP=s68-c-k-c0x00ffffff-no-rj",
            width: 68,
            height: 68,
          },
        ],
        ownerBadges: [],
        verified: false,
      },
      description: null,
      views: 1105948,
      duration: "1:29:29",
      uploadedAt: "2 months ago",
    },
    {
      type: "video",
      title: "The Kid LAROI, Justin Bieber - STAY (Official Video)",
      id: "kTJczUoc26U",
      url: "https://www.youtube.com/watch?v=kTJczUoc26U",
      bestThumbnail: {
        url: "https://i.ytimg.com/vi/kTJczUoc26U/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAdKxlnRLEpNZ-9tUtx61gfWBpO7A",
        width: 720,
        height: 404,
      },
      thumbnails: [
        {
          url: "https://i.ytimg.com/vi/kTJczUoc26U/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAdKxlnRLEpNZ-9tUtx61gfWBpO7A",
          width: 720,
          height: 404,
        },
        {
          url: "https://i.ytimg.com/vi/kTJczUoc26U/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCW-ttLjyTn0ct_MkJXHky4JeAvjg",
          width: 360,
          height: 202,
        },
      ],
      isUpcoming: false,
      upcoming: null,
      isLive: false,
      badges: ["4K", "CC"],
      author: {
        name: "The Kid LAROI.",
        channelID: "UC6G2vAJrt407lwiynW116Eg",
        url: "https://www.youtube.com/channel/UC6G2vAJrt407lwiynW116Eg",
        bestAvatar: {
          url: "https://yt3.ggpht.com/wMZyzjfrXGLzDPVn87BXySqfzPl7rU20NmH65RcoATohsvor2Fi6g1EQzkXyHuDj6wXk_Lx2JQ=s88-c-k-c0x00ffffff-no-rj",
          width: 68,
          height: 68,
        },
        avatars: [
          {
            url: "https://yt3.ggpht.com/wMZyzjfrXGLzDPVn87BXySqfzPl7rU20NmH65RcoATohsvor2Fi6g1EQzkXyHuDj6wXk_Lx2JQ=s88-c-k-c0x00ffffff-no-rj",
            width: 68,
            height: 68,
          },
        ],
        ownerBadges: ["Official Artist Channel"],
        verified: true,
      },
      description: null,
      views: 644232235,
      duration: "2:38",
      uploadedAt: "1 year ago",
    },
    {
      type: "video",
      title:
        "Justin Bieber - Intentions (Official Video (Short Version)) ft. Quavo",
      id: "3AyMjyHu1bA",
      url: "https://www.youtube.com/watch?v=3AyMjyHu1bA",
      bestThumbnail: {
        url: "https://i.ytimg.com/vi/3AyMjyHu1bA/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCWpPMJOTU780p8wlkVOWDo2p_nhQ",
        width: 720,
        height: 404,
      },
      thumbnails: [
        {
          url: "https://i.ytimg.com/vi/3AyMjyHu1bA/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCWpPMJOTU780p8wlkVOWDo2p_nhQ",
          width: 720,
          height: 404,
        },
        {
          url: "https://i.ytimg.com/vi/3AyMjyHu1bA/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAC4OVDDFL_ttY6Y3pWwr3269Q9LA",
          width: 360,
          height: 202,
        },
      ],
      isUpcoming: false,
      upcoming: null,
      isLive: false,
      badges: ["CC"],
      author: {
        name: "Justin Bieber",
        channelID: "UCIwFjwMjI0y7PDBVEO9-bkQ",
        url: "https://www.youtube.com/channel/UCIwFjwMjI0y7PDBVEO9-bkQ",
        bestAvatar: {
          url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
          width: 68,
          height: 68,
        },
        avatars: [
          {
            url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
            width: 68,
            height: 68,
          },
        ],
        ownerBadges: ["Official Artist Channel"],
        verified: true,
      },
      description: null,
      views: 560347774,
      duration: "3:45",
      uploadedAt: "2 years ago",
    },
    {
      type: "video",
      title: "Justin Bieber - Hold On (Live from Paris)",
      id: "1WHPExTeOwg",
      url: "https://www.youtube.com/watch?v=1WHPExTeOwg",
      bestThumbnail: {
        url: "https://i.ytimg.com/vi/1WHPExTeOwg/hq720.jpg?sqp=-oaymwExCNAFEJQDSFryq4qpAyMIARUAAIhCGAHwAQH4AdQGgALgA4oCDAgAEAEYZSBWKFYwDw==&rs=AOn4CLCogCHEqrbb1sFr1MMs9HbGVxhRRQ",
        width: 720,
        height: 404,
      },
      thumbnails: [
        {
          url: "https://i.ytimg.com/vi/1WHPExTeOwg/hq720.jpg?sqp=-oaymwExCNAFEJQDSFryq4qpAyMIARUAAIhCGAHwAQH4AdQGgALgA4oCDAgAEAEYZSBWKFYwDw==&rs=AOn4CLCogCHEqrbb1sFr1MMs9HbGVxhRRQ",
          width: 720,
          height: 404,
        },
        {
          url: "https://i.ytimg.com/vi/1WHPExTeOwg/hq720.jpg?sqp=-oaymwE9COgCEMoBSFryq4qpAy8IARUAAAAAGAElAADIQj0AgKJDeAHwAQH4AdQGgALgA4oCDAgAEAEYZSBWKFYwDw==&rs=AOn4CLDe-JZyUXw9lwTbY5U6KSo1VjhXAA",
          width: 360,
          height: 202,
        },
      ],
      isUpcoming: false,
      upcoming: null,
      isLive: false,
      badges: ["4K"],
      author: {
        name: "Justin Bieber",
        channelID: "UCIwFjwMjI0y7PDBVEO9-bkQ",
        url: "https://www.youtube.com/channel/UCIwFjwMjI0y7PDBVEO9-bkQ",
        bestAvatar: {
          url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
          width: 68,
          height: 68,
        },
        avatars: [
          {
            url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
            width: 68,
            height: 68,
          },
        ],
        ownerBadges: ["Official Artist Channel"],
        verified: true,
      },
      description: null,
      views: 46015636,
      duration: "2:57",
      uploadedAt: "1 year ago",
    },
    {
      type: "video",
      title:
        "Best of Justin Bieber 2022 - Justin Bieber Greatest Hits Full Album New 2022",
      id: "N_J6zlClmPk",
      url: "https://www.youtube.com/watch?v=N_J6zlClmPk",
      bestThumbnail: {
        url: "https://i.ytimg.com/vi/N_J6zlClmPk/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAjmfR6v-G8fgvhkWnWtL49QpvC3g",
        width: 720,
        height: 404,
      },
      thumbnails: [
        {
          url: "https://i.ytimg.com/vi/N_J6zlClmPk/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAjmfR6v-G8fgvhkWnWtL49QpvC3g",
          width: 720,
          height: 404,
        },
        {
          url: "https://i.ytimg.com/vi/N_J6zlClmPk/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDEvrhGVJC9ljfqT3tWuGILsD6A_g",
          width: 360,
          height: 202,
        },
      ],
      isUpcoming: false,
      upcoming: null,
      isLive: false,
      badges: [],
      author: {
        name: "Musicas Internacionais",
        channelID: "UC9enO-No2yIhd3Rbcog4dHw",
        url: "https://www.youtube.com/channel/UC9enO-No2yIhd3Rbcog4dHw",
        bestAvatar: {
          url: "https://yt3.ggpht.com/d_2G9C7hBRjaqtY2awTaju1nAh5lbNfbyGYA4zkug7FYpj2pqfGSGb3bZ7kaZxl7UcKQH6yP=s68-c-k-c0x00ffffff-no-rj",
          width: 68,
          height: 68,
        },
        avatars: [
          {
            url: "https://yt3.ggpht.com/d_2G9C7hBRjaqtY2awTaju1nAh5lbNfbyGYA4zkug7FYpj2pqfGSGb3bZ7kaZxl7UcKQH6yP=s68-c-k-c0x00ffffff-no-rj",
            width: 68,
            height: 68,
          },
        ],
        ownerBadges: [],
        verified: false,
      },
      description: null,
      views: 114388,
      duration: "1:05:32",
      uploadedAt: "3 months ago",
    },
    {
      type: "video",
      title: "Justin Bieber - Baby ft. Ludacris",
      id: "kffacxfA7G4",
      url: "https://www.youtube.com/watch?v=kffacxfA7G4",
      bestThumbnail: {
        url: "https://i.ytimg.com/vi/kffacxfA7G4/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDm7Ja321NYzKF9nvMQTAK53jsmMw",
        width: 720,
        height: 404,
      },
      thumbnails: [
        {
          url: "https://i.ytimg.com/vi/kffacxfA7G4/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDm7Ja321NYzKF9nvMQTAK53jsmMw",
          width: 720,
          height: 404,
        },
        {
          url: "https://i.ytimg.com/vi/kffacxfA7G4/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAUKBrATo9H3qXlOnjg4WBXST2PCg",
          width: 360,
          height: 202,
        },
      ],
      isUpcoming: false,
      upcoming: null,
      isLive: false,
      badges: ["4K", "CC"],
      author: {
        name: "Justin Bieber",
        channelID: "UCIwFjwMjI0y7PDBVEO9-bkQ",
        url: "https://www.youtube.com/channel/UCIwFjwMjI0y7PDBVEO9-bkQ",
        bestAvatar: {
          url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
          width: 68,
          height: 68,
        },
        avatars: [
          {
            url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
            width: 68,
            height: 68,
          },
        ],
        ownerBadges: ["Official Artist Channel"],
        verified: true,
      },
      description: null,
      views: 2865407663,
      duration: "3:40",
      uploadedAt: "12 years ago",
    },
    {
      type: "shelf",
      title: "Channels new to you",
      items: [
        {
          type: "video",
          title:
            "Justin Bieber - Mistletoe (Lyrics) | But I'ma be under the mistletoe",
          id: "SvRY4-g-m1I",
          url: "https://www.youtube.com/watch?v=SvRY4-g-m1I",
          bestThumbnail: {
            url: "https://i.ytimg.com/vi/SvRY4-g-m1I/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBQCLK6GT6hE07s1GD4rurpO_zHNA",
            width: 720,
            height: 404,
          },
          thumbnails: [
            {
              url: "https://i.ytimg.com/vi/SvRY4-g-m1I/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBQCLK6GT6hE07s1GD4rurpO_zHNA",
              width: 720,
              height: 404,
            },
            {
              url: "https://i.ytimg.com/vi/SvRY4-g-m1I/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDy5CQ5k0yHOXOIaQMwkGVkt2rF-Q",
              width: 360,
              height: 202,
            },
          ],
          isUpcoming: false,
          upcoming: null,
          isLive: false,
          badges: ["New"],
          author: {
            name: "Mellow Sounds",
            channelID: "UCmK4gbkHU_afGKdB9RARcqA",
            url: "https://www.youtube.com/@mellow_sounds",
            bestAvatar: {
              url: "https://yt3.ggpht.com/m_mOWkctUx-26YYN6IDYaeecEP_LfNkQY0vb3TNowdTEfYuo4MBKKZdFnqzZ7IUtu3AXcfrfAIc=s68-c-k-c0x00ffffff-no-rj",
              width: 68,
              height: 68,
            },
            avatars: [
              {
                url: "https://yt3.ggpht.com/m_mOWkctUx-26YYN6IDYaeecEP_LfNkQY0vb3TNowdTEfYuo4MBKKZdFnqzZ7IUtu3AXcfrfAIc=s68-c-k-c0x00ffffff-no-rj",
                width: 68,
                height: 68,
              },
            ],
            ownerBadges: [],
            verified: false,
          },
          description: null,
          views: 20281,
          duration: "4:04",
          uploadedAt: "1 day ago",
        },
        {
          type: "video",
          title:
            "Justin Bieber Sends A Strong Message To Kanye West For Exposing Hailey Bieber",
          id: "8vKF8z8eOxw",
          url: "https://www.youtube.com/watch?v=8vKF8z8eOxw",
          bestThumbnail: {
            url: "https://i.ytimg.com/vi/8vKF8z8eOxw/hqdefault.jpg?sqp=-oaymwEjCOADEI4CSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLArbpx4C13Yg8LtC-pqvTB84-cA6Q",
            width: 480,
            height: 270,
          },
          thumbnails: [
            {
              url: "https://i.ytimg.com/vi/8vKF8z8eOxw/hqdefault.jpg?sqp=-oaymwEjCOADEI4CSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLArbpx4C13Yg8LtC-pqvTB84-cA6Q",
              width: 480,
              height: 270,
            },
          ],
          isUpcoming: false,
          upcoming: null,
          isLive: false,
          badges: [],
          author: {
            name: "This Happened",
            channelID: "UCylyoo597NuFFyJS_HwHubQ",
            url: "https://www.youtube.com/@thishappened1592",
            bestAvatar: {
              url: "https://yt3.ggpht.com/vSjRLrQ5x1Ru_7HSCNmX39LCh9RGkkProND-rePmNvDKdm_QFjRBcqSjJGi1AAVf7-mEPPOa=s68-c-k-c0x00ffffff-no-rj",
              width: 68,
              height: 68,
            },
            avatars: [
              {
                url: "https://yt3.ggpht.com/vSjRLrQ5x1Ru_7HSCNmX39LCh9RGkkProND-rePmNvDKdm_QFjRBcqSjJGi1AAVf7-mEPPOa=s68-c-k-c0x00ffffff-no-rj",
                width: 68,
                height: 68,
              },
            ],
            ownerBadges: ["Verified"],
            verified: true,
          },
          description: null,
          views: 432610,
          duration: "10:15",
          uploadedAt: "1 month ago",
        },
        {
          type: "video",
          title: "Justin Bieber - Ghost (Lyrics)",
          id: "mhZ5N9Z2nlY",
          url: "https://www.youtube.com/watch?v=mhZ5N9Z2nlY",
          bestThumbnail: {
            url: "https://i.ytimg.com/vi/mhZ5N9Z2nlY/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCwN-GfEFIE4jowZEtz7HBOVX5JWw",
            width: 720,
            height: 404,
          },
          thumbnails: [
            {
              url: "https://i.ytimg.com/vi/mhZ5N9Z2nlY/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCwN-GfEFIE4jowZEtz7HBOVX5JWw",
              width: 720,
              height: 404,
            },
            {
              url: "https://i.ytimg.com/vi/mhZ5N9Z2nlY/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBVGJO9dtpYVuJBqDYlquTAQwlVQQ",
              width: 360,
              height: 202,
            },
          ],
          isUpcoming: false,
          upcoming: null,
          isLive: false,
          badges: ["New"],
          author: {
            name: "RK UNITED",
            channelID: "UC5WsXt4Ipr2y1HNYAYU436A",
            url: "https://www.youtube.com/@RKUNITED69",
            bestAvatar: {
              url: "https://yt3.ggpht.com/Wee-zdaYWOvd0GfhoEmHvjzQyPQzmDCSqYVuC0h4W89r9i62IEommf_Tx0pJu-28pEhkrvpClxE=s68-c-k-c0x00ffffff-no-rj",
              width: 68,
              height: 68,
            },
            avatars: [
              {
                url: "https://yt3.ggpht.com/Wee-zdaYWOvd0GfhoEmHvjzQyPQzmDCSqYVuC0h4W89r9i62IEommf_Tx0pJu-28pEhkrvpClxE=s68-c-k-c0x00ffffff-no-rj",
                width: 68,
                height: 68,
              },
            ],
            ownerBadges: ["Verified"],
            verified: true,
          },
          description: null,
          views: 47065,
          duration: "3:08",
          uploadedAt: "3 days ago",
        },
        {
          type: "video",
          title:
            "Justin Bieber X Free Fire - Beautiful Love (Free Fire) [Official Video]",
          id: "_lpSCOZ1PCo",
          url: "https://www.youtube.com/watch?v=_lpSCOZ1PCo",
          bestThumbnail: {
            url: "https://i.ytimg.com/vi/_lpSCOZ1PCo/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLB6hSCiKAY1p-wGMFH7T3r-m_HRYQ",
            width: 720,
            height: 404,
          },
          thumbnails: [
            {
              url: "https://i.ytimg.com/vi/_lpSCOZ1PCo/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLB6hSCiKAY1p-wGMFH7T3r-m_HRYQ",
              width: 720,
              height: 404,
            },
            {
              url: "https://i.ytimg.com/vi/_lpSCOZ1PCo/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAgUj6J8nUCpV0aK2du5S7FA22QMQ",
              width: 360,
              height: 202,
            },
          ],
          isUpcoming: false,
          upcoming: null,
          isLive: false,
          badges: [],
          author: {
            name: "Justin Bieber",
            channelID: "UCIwFjwMjI0y7PDBVEO9-bkQ",
            url: "https://www.youtube.com/channel/UCIwFjwMjI0y7PDBVEO9-bkQ",
            bestAvatar: {
              url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
              width: 68,
              height: 68,
            },
            avatars: [
              {
                url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
                width: 68,
                height: 68,
              },
            ],
            ownerBadges: ["Official Artist Channel"],
            verified: true,
          },
          description: null,
          views: 2620070,
          duration: "3:33",
          uploadedAt: "2 months ago",
        },
        {
          type: "video",
          title: "Hailey Bieber Details Sex Life With Justin Bieber!",
          id: "ymJwB5wAV-I",
          url: "https://www.youtube.com/watch?v=ymJwB5wAV-I",
          bestThumbnail: {
            url: "https://i.ytimg.com/vi/ymJwB5wAV-I/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBR0hD_tEuvpJqmSxZRiVgU-i4now",
            width: 720,
            height: 404,
          },
          thumbnails: [
            {
              url: "https://i.ytimg.com/vi/ymJwB5wAV-I/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBR0hD_tEuvpJqmSxZRiVgU-i4now",
              width: 720,
              height: 404,
            },
            {
              url: "https://i.ytimg.com/vi/ymJwB5wAV-I/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBIvaT7D6n0Lsqc8ttFole2Gdf2KQ",
              width: 360,
              height: 202,
            },
          ],
          isUpcoming: false,
          upcoming: null,
          isLive: false,
          badges: [],
          author: {
            name: "Entertainment Tonight",
            channelID: "UCdtXPiqI2cLorKaPrfpKc4g",
            url: "https://www.youtube.com/@EntertainmentTonight",
            bestAvatar: {
              url: "https://yt3.ggpht.com/ytc/AMLnZu8G4-Xnhmn-e33JptoJziqg15GMhX8LvLKKdE19fw=s68-c-k-c0x00ffffff-no-rj",
              width: 68,
              height: 68,
            },
            avatars: [
              {
                url: "https://yt3.ggpht.com/ytc/AMLnZu8G4-Xnhmn-e33JptoJziqg15GMhX8LvLKKdE19fw=s68-c-k-c0x00ffffff-no-rj",
                width: 68,
                height: 68,
              },
            ],
            ownerBadges: ["Verified"],
            verified: true,
          },
          description: null,
          views: 505313,
          duration: "4:06",
          uploadedAt: "1 month ago",
        },
        {
          type: "video",
          title: "Justin Bieber - Favorite Girl (Lyrics)",
          id: "Fkt_oNdkNHw",
          url: "https://www.youtube.com/watch?v=Fkt_oNdkNHw",
          bestThumbnail: {
            url: "https://i.ytimg.com/vi/Fkt_oNdkNHw/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBPA_y_LCeRSwGAwuDV55zyl2Z-OA",
            width: 720,
            height: 404,
          },
          thumbnails: [
            {
              url: "https://i.ytimg.com/vi/Fkt_oNdkNHw/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBPA_y_LCeRSwGAwuDV55zyl2Z-OA",
              width: 720,
              height: 404,
            },
            {
              url: "https://i.ytimg.com/vi/Fkt_oNdkNHw/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLD0fNedZ6_oDjARQUOltiu4v0JD5g",
              width: 360,
              height: 202,
            },
          ],
          isUpcoming: false,
          upcoming: null,
          isLive: false,
          badges: [],
          author: {
            name: "Digital Mount",
            channelID: "UCGD9D8qjPZuLzSanwM3H2wQ",
            url: "https://www.youtube.com/@digitalmount795",
            bestAvatar: {
              url: "https://yt3.ggpht.com/A7Lml0t8FfUMjEmOalfsHfk5eycruyREpFt7NdF0RWtkVMtOUDXjOh7Mh86w4AkblDZhQvq0gDw=s68-c-k-c0x00ffffff-no-rj",
              width: 68,
              height: 68,
            },
            avatars: [
              {
                url: "https://yt3.ggpht.com/A7Lml0t8FfUMjEmOalfsHfk5eycruyREpFt7NdF0RWtkVMtOUDXjOh7Mh86w4AkblDZhQvq0gDw=s68-c-k-c0x00ffffff-no-rj",
                width: 68,
                height: 68,
              },
            ],
            ownerBadges: ["Verified"],
            verified: true,
          },
          description: null,
          views: 774656,
          duration: "4:17",
          uploadedAt: "3 months ago",
        },
        {
          type: "video",
          title:
            "Justin Bieber ao lado de Dona Hailey INAUGURA nova loja no Japão MAS silêncio sobre Selena continua!",
          id: "kZAKJJmiLz0",
          url: "https://www.youtube.com/watch?v=kZAKJJmiLz0",
          bestThumbnail: {
            url: "https://i.ytimg.com/vi/kZAKJJmiLz0/hqdefault.jpg?sqp=-oaymwEjCOADEI4CSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCx8yrIGXwVcsaoYwa2BZ3vBW6vFQ",
            width: 480,
            height: 270,
          },
          thumbnails: [
            {
              url: "https://i.ytimg.com/vi/kZAKJJmiLz0/hqdefault.jpg?sqp=-oaymwEjCOADEI4CSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCx8yrIGXwVcsaoYwa2BZ3vBW6vFQ",
              width: 480,
              height: 270,
            },
          ],
          isUpcoming: false,
          upcoming: null,
          isLive: false,
          badges: ["New"],
          author: {
            name: "N e Celebridades",
            channelID: "UCbh7n7F-2-N27nTbwAshp0w",
            url: "https://www.youtube.com/@NeCelebridades",
            bestAvatar: {
              url: "https://yt3.ggpht.com/ytc/AMLnZu9KVBTkb284N0XO-mCKDCnXw2vtbDOYMUloDOnySw=s68-c-k-c0x00ffffff-no-rj",
              width: 68,
              height: 68,
            },
            avatars: [
              {
                url: "https://yt3.ggpht.com/ytc/AMLnZu9KVBTkb284N0XO-mCKDCnXw2vtbDOYMUloDOnySw=s68-c-k-c0x00ffffff-no-rj",
                width: 68,
                height: 68,
              },
            ],
            ownerBadges: ["Verified"],
            verified: true,
          },
          description: null,
          views: 14600,
          duration: "6:02",
          uploadedAt: "1 day ago",
        },
        {
          type: "video",
          title:
            "Hailey Bieber Talks Justin Bieber, Hannah Montana and Her Skin-Care Line Rhode | The Tonight Show",
          id: "aBEuQ5QqBEs",
          url: "https://www.youtube.com/watch?v=aBEuQ5QqBEs",
          bestThumbnail: {
            url: "https://i.ytimg.com/vi/aBEuQ5QqBEs/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLD-DDey85piSqIMJTPWeJhzIE3HrA",
            width: 720,
            height: 404,
          },
          thumbnails: [
            {
              url: "https://i.ytimg.com/vi/aBEuQ5QqBEs/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLD-DDey85piSqIMJTPWeJhzIE3HrA",
              width: 720,
              height: 404,
            },
            {
              url: "https://i.ytimg.com/vi/aBEuQ5QqBEs/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDQGVtrJpWRm4382rNvkNN1EWc2_A",
              width: 360,
              height: 202,
            },
          ],
          isUpcoming: false,
          upcoming: null,
          isLive: false,
          badges: ["CC"],
          author: {
            name: "The Tonight Show Starring Jimmy Fallon",
            channelID: "UC8-Th83bH_thdKZDJCrn88g",
            url: "https://www.youtube.com/@fallontonight",
            bestAvatar: {
              url: "https://yt3.ggpht.com/Lp9cu-xgKL0QYxdJ268CaZ63SrmODmZT2uRJjwPHvoeLOvd1LLNJWUd45tYR_VW9z5APPIPJpw=s68-c-k-c0x00ffffff-no-rj",
              width: 68,
              height: 68,
            },
            avatars: [
              {
                url: "https://yt3.ggpht.com/Lp9cu-xgKL0QYxdJ268CaZ63SrmODmZT2uRJjwPHvoeLOvd1LLNJWUd45tYR_VW9z5APPIPJpw=s68-c-k-c0x00ffffff-no-rj",
                width: 68,
                height: 68,
              },
            ],
            ownerBadges: ["Verified"],
            verified: true,
          },
          description: null,
          views: 1359301,
          duration: "6:58",
          uploadedAt: "5 months ago",
        },
        {
          type: "video",
          title:
            "Justin Bieber and Hailey Bieber at the Drew House Pop Up store in Tokyo, Japan (November 19, 2022)",
          id: "FxNf2n19Bk4",
          url: "https://www.youtube.com/watch?v=FxNf2n19Bk4",
          bestThumbnail: {
            url: "https://i.ytimg.com/vi/FxNf2n19Bk4/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCEkiUVUIjN8ClbEAkioyK--PrpSg",
            width: 720,
            height: 404,
          },
          thumbnails: [
            {
              url: "https://i.ytimg.com/vi/FxNf2n19Bk4/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCEkiUVUIjN8ClbEAkioyK--PrpSg",
              width: 720,
              height: 404,
            },
            {
              url: "https://i.ytimg.com/vi/FxNf2n19Bk4/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAInjWNU8Gu4X54KjL7BjiEGDg14Q",
              width: 360,
              height: 202,
            },
          ],
          isUpcoming: false,
          upcoming: null,
          isLive: false,
          badges: ["New"],
          author: {
            name: "Beliebers Squad",
            channelID: "UCiwdOoihD1bWOTG0fDQ0Xlg",
            url: "https://www.youtube.com/@BeliebersSquad",
            bestAvatar: {
              url: "https://yt3.ggpht.com/114hSl5g0aXERdd18_F7SVXc9f7d9oCsvv0l52FUYV4nki6GaOFCmh0NqT25FCeFJzpWurY_sA=s68-c-k-c0x00ffffff-no-rj",
              width: 68,
              height: 68,
            },
            avatars: [
              {
                url: "https://yt3.ggpht.com/114hSl5g0aXERdd18_F7SVXc9f7d9oCsvv0l52FUYV4nki6GaOFCmh0NqT25FCeFJzpWurY_sA=s68-c-k-c0x00ffffff-no-rj",
                width: 68,
                height: 68,
              },
            ],
            ownerBadges: [],
            verified: false,
          },
          description: null,
          views: 2611,
          duration: "11:41",
          uploadedAt: "1 day ago",
        },
      ],
    },
    {
      type: "channel",
      name: "Justin Bieber",
      channelID: "UCIwFjwMjI0y7PDBVEO9-bkQ",
      url: "https://www.youtube.com/@justinbieber",
      bestAvatar: {
        url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s176-c-k-c0x00ffffff-no-rj-mo",
        width: 176,
        height: 176,
      },
      avatars: [
        {
          url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s176-c-k-c0x00ffffff-no-rj-mo",
          width: 176,
          height: 176,
        },
        {
          url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj-mo",
          width: 88,
          height: 88,
        },
      ],
      verified: true,
      subscribers: "70.5M subscribers",
      descriptionShort:
        "Help change the world. JUSTICE the album out now https://JustinBieber.lnk.to/Justice.",
      videos: 452,
    },
    {
      type: "video",
      title: "Justin Bieber - What Do You Mean?",
      id: "DK_0jXPuIr0",
      url: "https://www.youtube.com/watch?v=DK_0jXPuIr0",
      bestThumbnail: {
        url: "https://i.ytimg.com/vi/DK_0jXPuIr0/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBKdi5r0rQbIk_zcUKGyCFB8DyRyA",
        width: 720,
        height: 404,
      },
      thumbnails: [
        {
          url: "https://i.ytimg.com/vi/DK_0jXPuIr0/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBKdi5r0rQbIk_zcUKGyCFB8DyRyA",
          width: 720,
          height: 404,
        },
        {
          url: "https://i.ytimg.com/vi/DK_0jXPuIr0/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAd1vkMS6YbpTyZkjzM1IkDIPFACQ",
          width: 360,
          height: 202,
        },
      ],
      isUpcoming: false,
      upcoming: null,
      isLive: false,
      badges: ["CC"],
      author: {
        name: "Justin Bieber",
        channelID: "UCIwFjwMjI0y7PDBVEO9-bkQ",
        url: "https://www.youtube.com/channel/UCIwFjwMjI0y7PDBVEO9-bkQ",
        bestAvatar: {
          url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
          width: 68,
          height: 68,
        },
        avatars: [
          {
            url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
            width: 68,
            height: 68,
          },
        ],
        ownerBadges: ["Official Artist Channel"],
        verified: true,
      },
      description: null,
      views: 2212140232,
      duration: "4:58",
      uploadedAt: "7 years ago",
    },
    {
      type: "video",
      title: "Justin Bieber - 2 Much (Live from Paris)",
      id: "xFJjczkU4So",
      url: "https://www.youtube.com/watch?v=xFJjczkU4So",
      bestThumbnail: {
        url: "https://i.ytimg.com/vi/xFJjczkU4So/hq720.jpg?sqp=-oaymwExCNAFEJQDSFryq4qpAyMIARUAAIhCGAHwAQH4AdQGgALgA4oCDAgAEAEYEyBSKH8wDw==&rs=AOn4CLBMzHK3ub4qO-ynAoWKG4n4L90tXQ",
        width: 720,
        height: 404,
      },
      thumbnails: [
        {
          url: "https://i.ytimg.com/vi/xFJjczkU4So/hq720.jpg?sqp=-oaymwExCNAFEJQDSFryq4qpAyMIARUAAIhCGAHwAQH4AdQGgALgA4oCDAgAEAEYEyBSKH8wDw==&rs=AOn4CLBMzHK3ub4qO-ynAoWKG4n4L90tXQ",
          width: 720,
          height: 404,
        },
        {
          url: "https://i.ytimg.com/vi/xFJjczkU4So/hq720.jpg?sqp=-oaymwE9COgCEMoBSFryq4qpAy8IARUAAAAAGAElAADIQj0AgKJDeAHwAQH4AdQGgALgA4oCDAgAEAEYEyBSKH8wDw==&rs=AOn4CLBDqYgINRYE_gABza-Hbc3JRmwLsA",
          width: 360,
          height: 202,
        },
      ],
      isUpcoming: false,
      upcoming: null,
      isLive: false,
      badges: ["4K"],
      author: {
        name: "Justin Bieber",
        channelID: "UCIwFjwMjI0y7PDBVEO9-bkQ",
        url: "https://www.youtube.com/channel/UCIwFjwMjI0y7PDBVEO9-bkQ",
        bestAvatar: {
          url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
          width: 68,
          height: 68,
        },
        avatars: [
          {
            url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
            width: 68,
            height: 68,
          },
        ],
        ownerBadges: ["Official Artist Channel"],
        verified: true,
      },
      description: null,
      views: 19280749,
      duration: "2:19",
      uploadedAt: "1 year ago",
    },
    {
      type: "video",
      title: "Justin Bieber - Sorry (PURPOSE : The Movement)",
      id: "fRh_vgS2dFE",
      url: "https://www.youtube.com/watch?v=fRh_vgS2dFE",
      bestThumbnail: {
        url: "https://i.ytimg.com/vi/fRh_vgS2dFE/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCHCxpUdLkN8JYEBkn8r1j8SKg0gw",
        width: 720,
        height: 404,
      },
      thumbnails: [
        {
          url: "https://i.ytimg.com/vi/fRh_vgS2dFE/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCHCxpUdLkN8JYEBkn8r1j8SKg0gw",
          width: 720,
          height: 404,
        },
        {
          url: "https://i.ytimg.com/vi/fRh_vgS2dFE/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCLZ0L7UUUGI3CrjSDjADoSAfnAog",
          width: 360,
          height: 202,
        },
      ],
      isUpcoming: false,
      upcoming: null,
      isLive: false,
      badges: ["CC"],
      author: {
        name: "Justin Bieber",
        channelID: "UCIwFjwMjI0y7PDBVEO9-bkQ",
        url: "https://www.youtube.com/channel/UCIwFjwMjI0y7PDBVEO9-bkQ",
        bestAvatar: {
          url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
          width: 68,
          height: 68,
        },
        avatars: [
          {
            url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
            width: 68,
            height: 68,
          },
        ],
        ownerBadges: ["Official Artist Channel"],
        verified: true,
      },
      description: null,
      views: 3603971609,
      duration: "3:26",
      uploadedAt: "7 years ago",
    },
    {
      type: "shelf",
      title: "People also watched",
      items: [
        {
          type: "video",
          title: "Justin Bieber - Favorite Girl (Lyrics)",
          id: "XU7nrf2HXjw",
          url: "https://www.youtube.com/watch?v=XU7nrf2HXjw",
          bestThumbnail: {
            url: "https://i.ytimg.com/vi/XU7nrf2HXjw/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCcAAwslOSSuHDRPAnF8qQiaOVKHA",
            width: 720,
            height: 404,
          },
          thumbnails: [
            {
              url: "https://i.ytimg.com/vi/XU7nrf2HXjw/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCcAAwslOSSuHDRPAnF8qQiaOVKHA",
              width: 720,
              height: 404,
            },
            {
              url: "https://i.ytimg.com/vi/XU7nrf2HXjw/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDOjHGfW8cVn00qQU_DMASUezczmA",
              width: 360,
              height: 202,
            },
          ],
          isUpcoming: false,
          upcoming: null,
          isLive: false,
          badges: [],
          author: {
            name: "Kaku",
            channelID: "UCA7bkfWZT78vd6_jYC0RIFg",
            url: "https://www.youtube.com/channel/UCA7bkfWZT78vd6_jYC0RIFg",
            bestAvatar: {
              url: "https://yt3.ggpht.com/ytc/AMLnZu920iL0jg8Ma43rQX9sXt5wRaabWl3IUkq_sVYm=s68-c-k-c0x00ffffff-no-rj",
              width: 68,
              height: 68,
            },
            avatars: [
              {
                url: "https://yt3.ggpht.com/ytc/AMLnZu920iL0jg8Ma43rQX9sXt5wRaabWl3IUkq_sVYm=s68-c-k-c0x00ffffff-no-rj",
                width: 68,
                height: 68,
              },
            ],
            ownerBadges: [],
            verified: false,
          },
          description: null,
          views: 2331134,
          duration: "4:13",
          uploadedAt: "1 month ago",
        },
        {
          type: "video",
          title: "Ed Sheeran: Tiny Desk (Home) Concert",
          id: "4MsoqUv5gv4",
          url: "https://www.youtube.com/watch?v=4MsoqUv5gv4",
          bestThumbnail: {
            url: "https://i.ytimg.com/vi/4MsoqUv5gv4/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBNFQgp0aYJfpypWsC0smhKmOnfHw",
            width: 720,
            height: 404,
          },
          thumbnails: [
            {
              url: "https://i.ytimg.com/vi/4MsoqUv5gv4/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBNFQgp0aYJfpypWsC0smhKmOnfHw",
              width: 720,
              height: 404,
            },
            {
              url: "https://i.ytimg.com/vi/4MsoqUv5gv4/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDE7Kqw8JgUPalc4LnuIAKLf0K8Bw",
              width: 360,
              height: 202,
            },
          ],
          isUpcoming: false,
          upcoming: null,
          isLive: false,
          badges: [],
          author: {
            name: "NPR Music",
            channelID: "UC4eYXhJI4-7wSWc8UNRwD4A",
            url: "https://www.youtube.com/@nprmusic",
            bestAvatar: {
              url: "https://yt3.ggpht.com/ytc/AMLnZu-rTu1Ac45tennQVoB5v4CMOoVzBulfqmsT4yEUIw=s68-c-k-c0x00ffffff-no-rj",
              width: 68,
              height: 68,
            },
            avatars: [
              {
                url: "https://yt3.ggpht.com/ytc/AMLnZu-rTu1Ac45tennQVoB5v4CMOoVzBulfqmsT4yEUIw=s68-c-k-c0x00ffffff-no-rj",
                width: 68,
                height: 68,
              },
            ],
            ownerBadges: ["Verified"],
            verified: true,
          },
          description: null,
          views: 8447472,
          duration: "22:37",
          uploadedAt: "1 year ago",
        },
        {
          type: "video",
          title:
            "Justin Bieber & Hailey Bieber - Let Me Love You (Official Music Video)",
          id: "FHb-nHn5EAU",
          url: "https://www.youtube.com/watch?v=FHb-nHn5EAU",
          bestThumbnail: {
            url: "https://i.ytimg.com/vi/FHb-nHn5EAU/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAoz_hZsNYiMT6NPPzMuZvYN-5iIw",
            width: 720,
            height: 404,
          },
          thumbnails: [
            {
              url: "https://i.ytimg.com/vi/FHb-nHn5EAU/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAoz_hZsNYiMT6NPPzMuZvYN-5iIw",
              width: 720,
              height: 404,
            },
            {
              url: "https://i.ytimg.com/vi/FHb-nHn5EAU/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLD5FY9cTKceklDW8pRhfw-ODzUoQw",
              width: 360,
              height: 202,
            },
          ],
          isUpcoming: false,
          upcoming: null,
          isLive: false,
          badges: ["CC"],
          author: {
            name: "Amiz Tennyson",
            channelID: "UCLeB1KBS_qwAuk-DrRH3ybQ",
            url: "https://www.youtube.com/@AmizTennyson",
            bestAvatar: {
              url: "https://yt3.ggpht.com/ytc/AMLnZu8IMuYYYPIKx9f7wm4KKlFUfevccNxZQHjkzyA-Cg=s68-c-k-c0x00ffffff-no-rj",
              width: 68,
              height: 68,
            },
            avatars: [
              {
                url: "https://yt3.ggpht.com/ytc/AMLnZu8IMuYYYPIKx9f7wm4KKlFUfevccNxZQHjkzyA-Cg=s68-c-k-c0x00ffffff-no-rj",
                width: 68,
                height: 68,
              },
            ],
            ownerBadges: [],
            verified: false,
          },
          description: null,
          views: 16513780,
          duration: "3:22",
          uploadedAt: "2 years ago",
        },
        {
          type: "video",
          title: "Justin Bieber & Omah Lay - Attention (Official Video)",
          id: "kF4QRGQM2ig",
          url: "https://www.youtube.com/watch?v=kF4QRGQM2ig",
          bestThumbnail: {
            url: "https://i.ytimg.com/vi/kF4QRGQM2ig/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLA9cFnbl3pPkQGQZxtMS7JHWZWZ-w",
            width: 720,
            height: 404,
          },
          thumbnails: [
            {
              url: "https://i.ytimg.com/vi/kF4QRGQM2ig/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLA9cFnbl3pPkQGQZxtMS7JHWZWZ-w",
              width: 720,
              height: 404,
            },
            {
              url: "https://i.ytimg.com/vi/kF4QRGQM2ig/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLD-fM9VrbBc82IWrzFnydbcuVi-vQ",
              width: 360,
              height: 202,
            },
          ],
          isUpcoming: false,
          upcoming: null,
          isLive: false,
          badges: ["4K"],
          author: {
            name: "Justin Bieber",
            channelID: "UCIwFjwMjI0y7PDBVEO9-bkQ",
            url: "https://www.youtube.com/channel/UCIwFjwMjI0y7PDBVEO9-bkQ",
            bestAvatar: {
              url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
              width: 68,
              height: 68,
            },
            avatars: [
              {
                url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
                width: 68,
                height: 68,
              },
            ],
            ownerBadges: ["Official Artist Channel"],
            verified: true,
          },
          description: null,
          views: 8570432,
          duration: "3:08",
          uploadedAt: "8 months ago",
        },
        {
          type: "video",
          title: "Dj Snake - Let Me Love You ft Justin Bieber",
          id: "Mrmv1gCEMRk",
          url: "https://www.youtube.com/watch?v=Mrmv1gCEMRk",
          bestThumbnail: {
            url: "https://i.ytimg.com/vi/Mrmv1gCEMRk/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBbgkJL-2CwRwAEsnWfxD95oZNZ1w",
            width: 720,
            height: 404,
          },
          thumbnails: [
            {
              url: "https://i.ytimg.com/vi/Mrmv1gCEMRk/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBbgkJL-2CwRwAEsnWfxD95oZNZ1w",
              width: 720,
              height: 404,
            },
            {
              url: "https://i.ytimg.com/vi/Mrmv1gCEMRk/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAjTZ0jsYZSvKxm-iN8e4o8jopSBg",
              width: 360,
              height: 202,
            },
          ],
          isUpcoming: false,
          upcoming: null,
          isLive: false,
          badges: [],
          author: {
            name: "Justin Bieber World",
            channelID: "UCse0vq62TPboIZmsyj0ZeVw",
            url: "https://www.youtube.com/@justinbieberworld7489",
            bestAvatar: {
              url: "https://yt3.ggpht.com/ytc/AMLnZu_FDlcifxuUZ8SA_-F2LIFxaGxvW4NgIKlckFRYtg=s68-c-k-c0x00ffffff-no-rj",
              width: 68,
              height: 68,
            },
            avatars: [
              {
                url: "https://yt3.ggpht.com/ytc/AMLnZu_FDlcifxuUZ8SA_-F2LIFxaGxvW4NgIKlckFRYtg=s68-c-k-c0x00ffffff-no-rj",
                width: 68,
                height: 68,
              },
            ],
            ownerBadges: [],
            verified: false,
          },
          description: null,
          views: 361023671,
          duration: "3:25",
          uploadedAt: "6 years ago",
        },
        {
          type: "video",
          title: "Justin Bieber - Intentions ft. Quavo (Official Video)",
          id: "9p2wMpVVtXg",
          url: "https://www.youtube.com/watch?v=9p2wMpVVtXg",
          bestThumbnail: {
            url: "https://i.ytimg.com/vi/9p2wMpVVtXg/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLATy4_ckW3qAHJMGtNsWO2PBHE7Bg",
            width: 720,
            height: 404,
          },
          thumbnails: [
            {
              url: "https://i.ytimg.com/vi/9p2wMpVVtXg/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLATy4_ckW3qAHJMGtNsWO2PBHE7Bg",
              width: 720,
              height: 404,
            },
            {
              url: "https://i.ytimg.com/vi/9p2wMpVVtXg/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCOGCAbi-WpfGNO6vKnEq-EGp0RtQ",
              width: 360,
              height: 202,
            },
          ],
          isUpcoming: false,
          upcoming: null,
          isLive: false,
          badges: ["CC"],
          author: {
            name: "Justin Bieber",
            channelID: "UCIwFjwMjI0y7PDBVEO9-bkQ",
            url: "https://www.youtube.com/channel/UCIwFjwMjI0y7PDBVEO9-bkQ",
            bestAvatar: {
              url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
              width: 68,
              height: 68,
            },
            avatars: [
              {
                url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
                width: 68,
                height: 68,
              },
            ],
            ownerBadges: ["Official Artist Channel"],
            verified: true,
          },
          description: null,
          views: 85559024,
          duration: "6:40",
          uploadedAt: "2 years ago",
        },
        {
          type: "video",
          title:
            "Justin Bieber - Somebody To Love Remix ft. Usher (Official Music Video)",
          id: "SOI4OF7iIr4",
          url: "https://www.youtube.com/watch?v=SOI4OF7iIr4",
          bestThumbnail: {
            url: "https://i.ytimg.com/vi/SOI4OF7iIr4/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLB_zELunjzWBgYj-wRhYUbbrEkFVw",
            width: 720,
            height: 404,
          },
          thumbnails: [
            {
              url: "https://i.ytimg.com/vi/SOI4OF7iIr4/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLB_zELunjzWBgYj-wRhYUbbrEkFVw",
              width: 720,
              height: 404,
            },
            {
              url: "https://i.ytimg.com/vi/SOI4OF7iIr4/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAHA6ttcm6FqwQAYLiuxcl_Tlu19Q",
              width: 360,
              height: 202,
            },
          ],
          isUpcoming: false,
          upcoming: null,
          isLive: false,
          badges: ["CC"],
          author: {
            name: "Justin Bieber",
            channelID: "UCIwFjwMjI0y7PDBVEO9-bkQ",
            url: "https://www.youtube.com/channel/UCIwFjwMjI0y7PDBVEO9-bkQ",
            bestAvatar: {
              url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
              width: 68,
              height: 68,
            },
            avatars: [
              {
                url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
                width: 68,
                height: 68,
              },
            ],
            ownerBadges: ["Official Artist Channel"],
            verified: true,
          },
          description: null,
          views: 492976591,
          duration: "3:39",
          uploadedAt: "12 years ago",
        },
        {
          type: "video",
          title: "Usher: Tiny Desk Concert",
          id: "up8ODGFWgFg",
          url: "https://www.youtube.com/watch?v=up8ODGFWgFg",
          bestThumbnail: {
            url: "https://i.ytimg.com/vi/up8ODGFWgFg/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLD6vbr_rK0aS8TYlf6Nk9EYjr4hlQ",
            width: 720,
            height: 404,
          },
          thumbnails: [
            {
              url: "https://i.ytimg.com/vi/up8ODGFWgFg/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLD6vbr_rK0aS8TYlf6Nk9EYjr4hlQ",
              width: 720,
              height: 404,
            },
            {
              url: "https://i.ytimg.com/vi/up8ODGFWgFg/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAApwLP4f9u0ytCpFTYHbryupWzHA",
              width: 360,
              height: 202,
            },
          ],
          isUpcoming: false,
          upcoming: null,
          isLive: false,
          badges: [],
          author: {
            name: "NPR Music",
            channelID: "UC4eYXhJI4-7wSWc8UNRwD4A",
            url: "https://www.youtube.com/@nprmusic",
            bestAvatar: {
              url: "https://yt3.ggpht.com/ytc/AMLnZu-rTu1Ac45tennQVoB5v4CMOoVzBulfqmsT4yEUIw=s68-c-k-c0x00ffffff-no-rj",
              width: 68,
              height: 68,
            },
            avatars: [
              {
                url: "https://yt3.ggpht.com/ytc/AMLnZu-rTu1Ac45tennQVoB5v4CMOoVzBulfqmsT4yEUIw=s68-c-k-c0x00ffffff-no-rj",
                width: 68,
                height: 68,
              },
            ],
            ownerBadges: ["Verified"],
            verified: true,
          },
          description: null,
          views: 12858393,
          duration: "24:47",
          uploadedAt: "4 months ago",
        },
        {
          type: "video",
          title:
            "JustinBieber - Greatest Hits 2022 | TOP 100 Songs of the Weeks 2022 - Best Playlist Full Album",
          id: "gP9yCQf9x7M",
          url: "https://www.youtube.com/watch?v=gP9yCQf9x7M",
          bestThumbnail: {
            url: "https://i.ytimg.com/vi/gP9yCQf9x7M/hq720.jpg?sqp=-oaymwExCNAFEJQDSFryq4qpAyMIARUAAIhCGAHwAQH4Af4JgALQBYoCDAgAEAEYMSBiKGUwDw==&rs=AOn4CLDP5L-mz8cwKI_aO2WQPdFyj0jBjA",
            width: 720,
            height: 404,
          },
          thumbnails: [
            {
              url: "https://i.ytimg.com/vi/gP9yCQf9x7M/hq720.jpg?sqp=-oaymwExCNAFEJQDSFryq4qpAyMIARUAAIhCGAHwAQH4Af4JgALQBYoCDAgAEAEYMSBiKGUwDw==&rs=AOn4CLDP5L-mz8cwKI_aO2WQPdFyj0jBjA",
              width: 720,
              height: 404,
            },
            {
              url: "https://i.ytimg.com/vi/gP9yCQf9x7M/hq720.jpg?sqp=-oaymwE9COgCEMoBSFryq4qpAy8IARUAAAAAGAElAADIQj0AgKJDeAHwAQH4Af4JgALQBYoCDAgAEAEYMSBiKGUwDw==&rs=AOn4CLCEiK0mGEh6TWNPSML_cG-782MuoQ",
              width: 360,
              height: 202,
            },
          ],
          isUpcoming: false,
          upcoming: null,
          isLive: false,
          badges: [],
          author: {
            name: "Pop Music",
            channelID: "UCN1KgmdoHshpsbTNRSTesvA",
            url: "https://www.youtube.com/@popmusic9673",
            bestAvatar: {
              url: "https://yt3.ggpht.com/azlrpLBuLzgNrwJkFc7HG4pqi9ojjR6hwgiS4X3W5GTbn9NHodcyZfyNzK5R-0Orx6zKqPALbw=s68-c-k-c0x00ffffff-no-rj",
              width: 68,
              height: 68,
            },
            avatars: [
              {
                url: "https://yt3.ggpht.com/azlrpLBuLzgNrwJkFc7HG4pqi9ojjR6hwgiS4X3W5GTbn9NHodcyZfyNzK5R-0Orx6zKqPALbw=s68-c-k-c0x00ffffff-no-rj",
                width: 68,
                height: 68,
              },
            ],
            ownerBadges: [],
            verified: false,
          },
          description: null,
          views: 610380,
          duration: "1:38:12",
          uploadedAt: "7 months ago",
        },
        {
          type: "video",
          title: "Inside Justin Bieber's Tour Bus | GQ",
          id: "G8PP7_JyYtQ",
          url: "https://www.youtube.com/watch?v=G8PP7_JyYtQ",
          bestThumbnail: {
            url: "https://i.ytimg.com/vi/G8PP7_JyYtQ/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBJDGHVkaYmSYqwAsIzTwxoazVbEg",
            width: 720,
            height: 404,
          },
          thumbnails: [
            {
              url: "https://i.ytimg.com/vi/G8PP7_JyYtQ/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBJDGHVkaYmSYqwAsIzTwxoazVbEg",
              width: 720,
              height: 404,
            },
            {
              url: "https://i.ytimg.com/vi/G8PP7_JyYtQ/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDvrqollGcLvLai7aY1CrOQcyeBLA",
              width: 360,
              height: 202,
            },
          ],
          isUpcoming: false,
          upcoming: null,
          isLive: false,
          badges: ["CC"],
          author: {
            name: "GQ",
            channelID: "UCsEukrAd64fqA7FjwkmZ_Dw",
            url: "https://www.youtube.com/@GQVideos",
            bestAvatar: {
              url: "https://yt3.ggpht.com/ytc/AMLnZu-gTmA2HcJO9Y5kYl4IUKG-jZ8QtojL8qaQiyW9kA=s68-c-k-c0x00ffffff-no-rj",
              width: 68,
              height: 68,
            },
            avatars: [
              {
                url: "https://yt3.ggpht.com/ytc/AMLnZu-gTmA2HcJO9Y5kYl4IUKG-jZ8QtojL8qaQiyW9kA=s68-c-k-c0x00ffffff-no-rj",
                width: 68,
                height: 68,
              },
            ],
            ownerBadges: ["Verified"],
            verified: true,
          },
          description: null,
          views: 10156698,
          duration: "8:08",
          uploadedAt: "1 year ago",
        },
      ],
    },
    {
      type: "video",
      title: "Justin Bieber - Holy ft. Chance The Rapper",
      id: "pvPsJFRGleA",
      url: "https://www.youtube.com/watch?v=pvPsJFRGleA",
      bestThumbnail: {
        url: "https://i.ytimg.com/vi/pvPsJFRGleA/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAoLXXDtlczw_CDkY7yI45ohGii5A",
        width: 720,
        height: 404,
      },
      thumbnails: [
        {
          url: "https://i.ytimg.com/vi/pvPsJFRGleA/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAoLXXDtlczw_CDkY7yI45ohGii5A",
          width: 720,
          height: 404,
        },
        {
          url: "https://i.ytimg.com/vi/pvPsJFRGleA/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAF46a29uhW9_9iYxmxGeeGxhFUqA",
          width: 360,
          height: 202,
        },
      ],
      isUpcoming: false,
      upcoming: null,
      isLive: false,
      badges: ["CC"],
      author: {
        name: "Justin Bieber",
        channelID: "UCIwFjwMjI0y7PDBVEO9-bkQ",
        url: "https://www.youtube.com/channel/UCIwFjwMjI0y7PDBVEO9-bkQ",
        bestAvatar: {
          url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
          width: 68,
          height: 68,
        },
        avatars: [
          {
            url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
            width: 68,
            height: 68,
          },
        ],
        ownerBadges: ["Official Artist Channel"],
        verified: true,
      },
      description: null,
      views: 210508345,
      duration: "5:29",
      uploadedAt: "2 years ago",
    },
    {
      type: "video",
      title: "Justin Bieber - Favorite Girl (Lyrics)",
      id: "0w9HdnJj1uY",
      url: "https://www.youtube.com/watch?v=0w9HdnJj1uY",
      bestThumbnail: {
        url: "https://i.ytimg.com/vi/0w9HdnJj1uY/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLC7uO9KdjWb9PywR3YI-vRtxYpA-w",
        width: 720,
        height: 404,
      },
      thumbnails: [
        {
          url: "https://i.ytimg.com/vi/0w9HdnJj1uY/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLC7uO9KdjWb9PywR3YI-vRtxYpA-w",
          width: 720,
          height: 404,
        },
        {
          url: "https://i.ytimg.com/vi/0w9HdnJj1uY/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCZGrFhHmTp5uvl2_TossbTVr3ROw",
          width: 360,
          height: 202,
        },
      ],
      isUpcoming: false,
      upcoming: null,
      isLive: false,
      badges: [],
      author: {
        name: "Wavy Ramen ",
        channelID: "UCbrpwX7MIntscR_eBP8_XxA",
        url: "https://www.youtube.com/@wavyramen1008",
        bestAvatar: {
          url: "https://yt3.ggpht.com/ebxnbstL8Gicz0VFTZ-jiqB1WoGMSgwfWS43sVho2MPpOCuTLWuSnlg2wJBbDhAbl7GgmHyc=s68-c-k-c0x00ffffff-no-rj",
          width: 68,
          height: 68,
        },
        avatars: [
          {
            url: "https://yt3.ggpht.com/ebxnbstL8Gicz0VFTZ-jiqB1WoGMSgwfWS43sVho2MPpOCuTLWuSnlg2wJBbDhAbl7GgmHyc=s68-c-k-c0x00ffffff-no-rj",
            width: 68,
            height: 68,
          },
        ],
        ownerBadges: [],
        verified: false,
      },
      description: null,
      views: 146748,
      duration: "4:17",
      uploadedAt: "1 month ago",
    },
    {
      type: "video",
      title: "Justin Bieber - Mistletoe (Official Music Video)",
      id: "LUjn3RpkcKY",
      url: "https://www.youtube.com/watch?v=LUjn3RpkcKY",
      bestThumbnail: {
        url: "https://i.ytimg.com/vi/LUjn3RpkcKY/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDZhUm4YudQTH3HLYo_WL2J_Bomcw",
        width: 720,
        height: 404,
      },
      thumbnails: [
        {
          url: "https://i.ytimg.com/vi/LUjn3RpkcKY/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDZhUm4YudQTH3HLYo_WL2J_Bomcw",
          width: 720,
          height: 404,
        },
        {
          url: "https://i.ytimg.com/vi/LUjn3RpkcKY/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDIVEEijQUd6YqCOyZlR65Q2xDwFA",
          width: 360,
          height: 202,
        },
      ],
      isUpcoming: false,
      upcoming: null,
      isLive: false,
      badges: ["4K", "CC"],
      author: {
        name: "Justin Bieber",
        channelID: "UCIwFjwMjI0y7PDBVEO9-bkQ",
        url: "https://www.youtube.com/channel/UCIwFjwMjI0y7PDBVEO9-bkQ",
        bestAvatar: {
          url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
          width: 68,
          height: 68,
        },
        avatars: [
          {
            url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
            width: 68,
            height: 68,
          },
        ],
        ownerBadges: ["Official Artist Channel"],
        verified: true,
      },
      description: null,
      views: 458879643,
      duration: "3:04",
      uploadedAt: "11 years ago",
    },
    {
      type: "video",
      title: "Justin Bieber - Anyone",
      id: "KIK3azN4w34",
      url: "https://www.youtube.com/watch?v=KIK3azN4w34",
      bestThumbnail: {
        url: "https://i.ytimg.com/vi/KIK3azN4w34/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCW9RPZitMoVWvnIgkAFvTvfuyxDA",
        width: 720,
        height: 404,
      },
      thumbnails: [
        {
          url: "https://i.ytimg.com/vi/KIK3azN4w34/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCW9RPZitMoVWvnIgkAFvTvfuyxDA",
          width: 720,
          height: 404,
        },
        {
          url: "https://i.ytimg.com/vi/KIK3azN4w34/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDDlVHlRORF6KkyFE8ShrqwX3N0IA",
          width: 360,
          height: 202,
        },
      ],
      isUpcoming: false,
      upcoming: null,
      isLive: false,
      badges: ["4K", "CC"],
      author: {
        name: "Justin Bieber",
        channelID: "UCIwFjwMjI0y7PDBVEO9-bkQ",
        url: "https://www.youtube.com/channel/UCIwFjwMjI0y7PDBVEO9-bkQ",
        bestAvatar: {
          url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
          width: 68,
          height: 68,
        },
        avatars: [
          {
            url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
            width: 68,
            height: 68,
          },
        ],
        ownerBadges: ["Official Artist Channel"],
        verified: true,
      },
      description: null,
      views: 101431779,
      duration: "4:24",
      uploadedAt: "1 year ago",
    },
    {
      type: "video",
      title: "Justin Bieber & benny blanco - Lonely (Official Music Video)",
      id: "xQOO2xGQ1Pc",
      url: "https://www.youtube.com/watch?v=xQOO2xGQ1Pc",
      bestThumbnail: {
        url: "https://i.ytimg.com/vi/xQOO2xGQ1Pc/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBPhSjPZdqAqC7X-lrc49oQeDpu2g",
        width: 720,
        height: 404,
      },
      thumbnails: [
        {
          url: "https://i.ytimg.com/vi/xQOO2xGQ1Pc/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBPhSjPZdqAqC7X-lrc49oQeDpu2g",
          width: 720,
          height: 404,
        },
        {
          url: "https://i.ytimg.com/vi/xQOO2xGQ1Pc/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLChQpdyXlm9hWLkWAO-_hGVB7K4Eg",
          width: 360,
          height: 202,
        },
      ],
      isUpcoming: false,
      upcoming: null,
      isLive: false,
      badges: ["4K", "CC"],
      author: {
        name: "Justin Bieber",
        channelID: "UCIwFjwMjI0y7PDBVEO9-bkQ",
        url: "https://www.youtube.com/channel/UCIwFjwMjI0y7PDBVEO9-bkQ",
        bestAvatar: {
          url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
          width: 68,
          height: 68,
        },
        avatars: [
          {
            url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
            width: 68,
            height: 68,
          },
        ],
        ownerBadges: ["Official Artist Channel"],
        verified: true,
      },
      description: null,
      views: 158683944,
      duration: "2:38",
      uploadedAt: "2 years ago",
    },
    {
      type: "shelf",
      title: "From related searches",
      items: [
        {
          type: "video",
          title: "Rema, Selena Gomez - Calm Down (Official Music Video)",
          id: "WcIcVapfqXw",
          url: "https://www.youtube.com/watch?v=WcIcVapfqXw",
          bestThumbnail: {
            url: "https://i.ytimg.com/vi/WcIcVapfqXw/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLA4ZcVWAukLykMxv_ACQk0o-EsJeQ",
            width: 720,
            height: 404,
          },
          thumbnails: [
            {
              url: "https://i.ytimg.com/vi/WcIcVapfqXw/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLA4ZcVWAukLykMxv_ACQk0o-EsJeQ",
              width: 720,
              height: 404,
            },
            {
              url: "https://i.ytimg.com/vi/WcIcVapfqXw/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCsqDvEmQJMMHBBDu0M2jsjwEi_9Q",
              width: 360,
              height: 202,
            },
          ],
          isUpcoming: false,
          upcoming: null,
          isLive: false,
          badges: ["CC"],
          author: {
            name: "Selena Gomez",
            channelID: "UCPNxhDvTcytIdvwXWAm43cA",
            url: "https://www.youtube.com/channel/UCPNxhDvTcytIdvwXWAm43cA",
            bestAvatar: {
              url: "https://yt3.ggpht.com/lwPYJMKoTNR2hs_hrXRFcTy0aQteNHEJnGwyfp0cwvjhJVZW6HWa6CTm_Bf99Y71U2V_FZMZenQ=s88-c-k-c0x00ffffff-no-rj",
              width: 68,
              height: 68,
            },
            avatars: [
              {
                url: "https://yt3.ggpht.com/lwPYJMKoTNR2hs_hrXRFcTy0aQteNHEJnGwyfp0cwvjhJVZW6HWa6CTm_Bf99Y71U2V_FZMZenQ=s88-c-k-c0x00ffffff-no-rj",
                width: 68,
                height: 68,
              },
            ],
            ownerBadges: ["Official Artist Channel"],
            verified: true,
          },
          description: null,
          views: 119382829,
          duration: "4:00",
          uploadedAt: "2 months ago",
        },
        {
          type: "video",
          title: "Shawn Mendes - When You're Gone",
          id: "tp4fUH2E8uc",
          url: "https://www.youtube.com/watch?v=tp4fUH2E8uc",
          bestThumbnail: {
            url: "https://i.ytimg.com/vi/tp4fUH2E8uc/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCsZoDfTPOjKgmDYjtn5882IkHCEw",
            width: 720,
            height: 404,
          },
          thumbnails: [
            {
              url: "https://i.ytimg.com/vi/tp4fUH2E8uc/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCsZoDfTPOjKgmDYjtn5882IkHCEw",
              width: 720,
              height: 404,
            },
            {
              url: "https://i.ytimg.com/vi/tp4fUH2E8uc/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLB7gQX5TRJwFmsfWESarJ4WPj782A",
              width: 360,
              height: 202,
            },
          ],
          isUpcoming: false,
          upcoming: null,
          isLive: false,
          badges: ["CC"],
          author: {
            name: "Shawn Mendes",
            channelID: "UCAvCL8hyXjSUHKEGuUPr1BA",
            url: "https://www.youtube.com/channel/UCAvCL8hyXjSUHKEGuUPr1BA",
            bestAvatar: {
              url: "https://yt3.ggpht.com/QTpsceScLWmzgZXO6lPJo-s0CzCaGoat2S8PZzfdKtvqJTUh7jCLtYvCPH1RbUzVCOz2t_RIqIA=s88-c-k-c0x00ffffff-no-rj",
              width: 68,
              height: 68,
            },
            avatars: [
              {
                url: "https://yt3.ggpht.com/QTpsceScLWmzgZXO6lPJo-s0CzCaGoat2S8PZzfdKtvqJTUh7jCLtYvCPH1RbUzVCOz2t_RIqIA=s88-c-k-c0x00ffffff-no-rj",
                width: 68,
                height: 68,
              },
            ],
            ownerBadges: ["Official Artist Channel"],
            verified: true,
          },
          description: null,
          views: 30451635,
          duration: "3:02",
          uploadedAt: "7 months ago",
        },
        {
          type: "video",
          title: "Ed Sheeran - Perfect (Official Music Video)",
          id: "2Vv-BfVoq4g",
          url: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
          bestThumbnail: {
            url: "https://i.ytimg.com/vi/2Vv-BfVoq4g/hqdefault.jpg?sqp=-oaymwEjCOADEI4CSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLC65QaIPYbRfTHC3A6fLSGhOTe5Tg",
            width: 480,
            height: 270,
          },
          thumbnails: [
            {
              url: "https://i.ytimg.com/vi/2Vv-BfVoq4g/hqdefault.jpg?sqp=-oaymwEjCOADEI4CSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLC65QaIPYbRfTHC3A6fLSGhOTe5Tg",
              width: 480,
              height: 270,
            },
          ],
          isUpcoming: false,
          upcoming: null,
          isLive: false,
          badges: ["4K"],
          author: {
            name: "Ed Sheeran",
            channelID: "UC0C-w0YjGpqDXGB8IHb662A",
            url: "https://www.youtube.com/channel/UC0C-w0YjGpqDXGB8IHb662A",
            bestAvatar: {
              url: "https://yt3.ggpht.com/dfnmqeOWWW69Ief7LccOZHs_RjNjlrnQetfOhIH_JwcgJGF_qPVg6aXrVfDvAZFYyqb3MIkg0g=s88-c-k-c0x00ffffff-no-rj",
              width: 68,
              height: 68,
            },
            avatars: [
              {
                url: "https://yt3.ggpht.com/dfnmqeOWWW69Ief7LccOZHs_RjNjlrnQetfOhIH_JwcgJGF_qPVg6aXrVfDvAZFYyqb3MIkg0g=s88-c-k-c0x00ffffff-no-rj",
                width: 68,
                height: 68,
              },
            ],
            ownerBadges: ["Official Artist Channel"],
            verified: true,
          },
          description: null,
          views: 3297960316,
          duration: "4:40",
          uploadedAt: "5 years ago",
        },
        {
          type: "video",
          title: "Justin Timberlake - Cry Me A River (Official Video)",
          id: "DksSPZTZES0",
          url: "https://www.youtube.com/watch?v=DksSPZTZES0",
          bestThumbnail: {
            url: "https://i.ytimg.com/vi/DksSPZTZES0/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBVD896airkIccOH8eno3ItRHobfg",
            width: 720,
            height: 404,
          },
          thumbnails: [
            {
              url: "https://i.ytimg.com/vi/DksSPZTZES0/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBVD896airkIccOH8eno3ItRHobfg",
              width: 720,
              height: 404,
            },
            {
              url: "https://i.ytimg.com/vi/DksSPZTZES0/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLC0pP-IaF4TzwYx8PXlu_E2PdwxCA",
              width: 360,
              height: 202,
            },
          ],
          isUpcoming: false,
          upcoming: null,
          isLive: false,
          badges: ["CC"],
          author: {
            name: "Justin Timberlake",
            channelID: "UC-y8ci7xfsu4L3zkSuHae0A",
            url: "https://www.youtube.com/channel/UC-y8ci7xfsu4L3zkSuHae0A",
            bestAvatar: {
              url: "https://yt3.ggpht.com/ytc/AMLnZu98Ozyyb1bDti0KgityY1cwluDap64uoLfbD3K07w=s88-c-k-c0x00ffffff-no-rj",
              width: 68,
              height: 68,
            },
            avatars: [
              {
                url: "https://yt3.ggpht.com/ytc/AMLnZu98Ozyyb1bDti0KgityY1cwluDap64uoLfbD3K07w=s88-c-k-c0x00ffffff-no-rj",
                width: 68,
                height: 68,
              },
            ],
            ownerBadges: ["Official Artist Channel"],
            verified: true,
          },
          description: null,
          views: 451904698,
          duration: "4:51",
          uploadedAt: "13 years ago",
        },
        {
          type: "video",
          title: "Harry Styles - As It Was (Official Video)",
          id: "H5v3kku4y6Q",
          url: "https://www.youtube.com/watch?v=H5v3kku4y6Q",
          bestThumbnail: {
            url: "https://i.ytimg.com/vi/H5v3kku4y6Q/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLApzYtM73T9_RzgK1L3lmWMoXVDhA",
            width: 720,
            height: 404,
          },
          thumbnails: [
            {
              url: "https://i.ytimg.com/vi/H5v3kku4y6Q/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLApzYtM73T9_RzgK1L3lmWMoXVDhA",
              width: 720,
              height: 404,
            },
            {
              url: "https://i.ytimg.com/vi/H5v3kku4y6Q/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAYqP_kYIGnaEUEhdBILI_k-Q-VRg",
              width: 360,
              height: 202,
            },
          ],
          isUpcoming: false,
          upcoming: null,
          isLive: false,
          badges: ["CC"],
          author: {
            name: "Harry Styles",
            channelID: "UCZFWPqqPkFlNwIxcpsLOwew",
            url: "https://www.youtube.com/channel/UCZFWPqqPkFlNwIxcpsLOwew",
            bestAvatar: {
              url: "https://yt3.ggpht.com/MjEWybBlBXVZigapX__tR_PyJRx-_OGwEZfWZKyS_jJrlgeeF67h69wN2HOhFohiDA7YNeIG=s88-c-k-c0x00ffffff-no-rj",
              width: 68,
              height: 68,
            },
            avatars: [
              {
                url: "https://yt3.ggpht.com/MjEWybBlBXVZigapX__tR_PyJRx-_OGwEZfWZKyS_jJrlgeeF67h69wN2HOhFohiDA7YNeIG=s88-c-k-c0x00ffffff-no-rj",
                width: 68,
                height: 68,
              },
            ],
            ownerBadges: ["Official Artist Channel"],
            verified: true,
          },
          description: null,
          views: 364365089,
          duration: "2:46",
          uploadedAt: "7 months ago",
        },
      ],
    },
    {
      type: "video",
      title: "Justin Bieber - Yummy (Official Video)",
      id: "8EJ3zbKTWQ8",
      url: "https://www.youtube.com/watch?v=8EJ3zbKTWQ8",
      bestThumbnail: {
        url: "https://i.ytimg.com/vi/8EJ3zbKTWQ8/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBm6r0BCdo_AUbkoBN5v7AZz-oh6w",
        width: 720,
        height: 404,
      },
      thumbnails: [
        {
          url: "https://i.ytimg.com/vi/8EJ3zbKTWQ8/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBm6r0BCdo_AUbkoBN5v7AZz-oh6w",
          width: 720,
          height: 404,
        },
        {
          url: "https://i.ytimg.com/vi/8EJ3zbKTWQ8/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDF8CskpTRl-PJIm8ko7WGZgi22gg",
          width: 360,
          height: 202,
        },
      ],
      isUpcoming: false,
      upcoming: null,
      isLive: false,
      badges: ["CC"],
      author: {
        name: "Justin Bieber",
        channelID: "UCIwFjwMjI0y7PDBVEO9-bkQ",
        url: "https://www.youtube.com/channel/UCIwFjwMjI0y7PDBVEO9-bkQ",
        bestAvatar: {
          url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
          width: 68,
          height: 68,
        },
        avatars: [
          {
            url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
            width: 68,
            height: 68,
          },
        ],
        ownerBadges: ["Official Artist Channel"],
        verified: true,
      },
      description: null,
      views: 744688865,
      duration: "3:51",
      uploadedAt: "2 years ago",
    },
    {
      type: "video",
      title: "Justin Bieber - I'll Show You",
      id: "PfGaX8G0f2E",
      url: "https://www.youtube.com/watch?v=PfGaX8G0f2E",
      bestThumbnail: {
        url: "https://i.ytimg.com/vi/PfGaX8G0f2E/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCXBjDEPOMKG6vdtp6nF9SY41sgVw",
        width: 720,
        height: 404,
      },
      thumbnails: [
        {
          url: "https://i.ytimg.com/vi/PfGaX8G0f2E/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCXBjDEPOMKG6vdtp6nF9SY41sgVw",
          width: 720,
          height: 404,
        },
        {
          url: "https://i.ytimg.com/vi/PfGaX8G0f2E/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDAezk2xZQYvdrkJ3UvAllVFIgInA",
          width: 360,
          height: 202,
        },
      ],
      isUpcoming: false,
      upcoming: null,
      isLive: false,
      badges: [],
      author: {
        name: "Justin Bieber",
        channelID: "UCIwFjwMjI0y7PDBVEO9-bkQ",
        url: "https://www.youtube.com/channel/UCIwFjwMjI0y7PDBVEO9-bkQ",
        bestAvatar: {
          url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
          width: 68,
          height: 68,
        },
        avatars: [
          {
            url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
            width: 68,
            height: 68,
          },
        ],
        ownerBadges: ["Official Artist Channel"],
        verified: true,
      },
      description: null,
      views: 503964180,
      duration: "3:21",
      uploadedAt: "7 years ago",
    },
    {
      type: "video",
      title: "Justin Bieber - Beauty And A Beat ft. Nicki Minaj",
      id: "Ys7-6_t7OEQ",
      url: "https://www.youtube.com/watch?v=Ys7-6_t7OEQ",
      bestThumbnail: {
        url: "https://i.ytimg.com/vi/Ys7-6_t7OEQ/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLB-h05GLWq-wFrMH-dWFsLu_329yg",
        width: 720,
        height: 404,
      },
      thumbnails: [
        {
          url: "https://i.ytimg.com/vi/Ys7-6_t7OEQ/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLB-h05GLWq-wFrMH-dWFsLu_329yg",
          width: 720,
          height: 404,
        },
        {
          url: "https://i.ytimg.com/vi/Ys7-6_t7OEQ/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA9GnB0kx1K7gaYkLiZcFG10KqK7g",
          width: 360,
          height: 202,
        },
      ],
      isUpcoming: false,
      upcoming: null,
      isLive: false,
      badges: ["CC"],
      author: {
        name: "Justin Bieber",
        channelID: "UCIwFjwMjI0y7PDBVEO9-bkQ",
        url: "https://www.youtube.com/channel/UCIwFjwMjI0y7PDBVEO9-bkQ",
        bestAvatar: {
          url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
          width: 68,
          height: 68,
        },
        avatars: [
          {
            url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
            width: 68,
            height: 68,
          },
        ],
        ownerBadges: ["Official Artist Channel"],
        verified: true,
      },
      description: null,
      views: 1019010759,
      duration: "4:53",
      uploadedAt: "10 years ago",
    },
    {
      type: "video",
      title: "Justin Bieber - Company",
      id: "gdx7gN1UyX0",
      url: "https://www.youtube.com/watch?v=gdx7gN1UyX0",
      bestThumbnail: {
        url: "https://i.ytimg.com/vi/gdx7gN1UyX0/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBaakJU1LRlg2WL1s3BXvishqMrBA",
        width: 720,
        height: 404,
      },
      thumbnails: [
        {
          url: "https://i.ytimg.com/vi/gdx7gN1UyX0/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBaakJU1LRlg2WL1s3BXvishqMrBA",
          width: 720,
          height: 404,
        },
        {
          url: "https://i.ytimg.com/vi/gdx7gN1UyX0/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBEbdKFpMR_pBDnOMsQp253RYV0Tw",
          width: 360,
          height: 202,
        },
      ],
      isUpcoming: false,
      upcoming: null,
      isLive: false,
      badges: ["CC"],
      author: {
        name: "Justin Bieber",
        channelID: "UCIwFjwMjI0y7PDBVEO9-bkQ",
        url: "https://www.youtube.com/channel/UCIwFjwMjI0y7PDBVEO9-bkQ",
        bestAvatar: {
          url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
          width: 68,
          height: 68,
        },
        avatars: [
          {
            url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
            width: 68,
            height: 68,
          },
        ],
        ownerBadges: ["Official Artist Channel"],
        verified: true,
      },
      description: null,
      views: 649118555,
      duration: "3:28",
      uploadedAt: "6 years ago",
    },
    {
      type: "video",
      title: "Justin Bieber - Honest ft. Don Toliver",
      id: "n1khwOk5dN8",
      url: "https://www.youtube.com/watch?v=n1khwOk5dN8",
      bestThumbnail: {
        url: "https://i.ytimg.com/vi/n1khwOk5dN8/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDPXf_4-IpDlih41RDUyauqej2_jw",
        width: 720,
        height: 404,
      },
      thumbnails: [
        {
          url: "https://i.ytimg.com/vi/n1khwOk5dN8/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDPXf_4-IpDlih41RDUyauqej2_jw",
          width: 720,
          height: 404,
        },
        {
          url: "https://i.ytimg.com/vi/n1khwOk5dN8/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBEOINBL0fv3kN-nlJ4sgAaHOYzgQ",
          width: 360,
          height: 202,
        },
      ],
      isUpcoming: false,
      upcoming: null,
      isLive: false,
      badges: ["4K", "CC"],
      author: {
        name: "Justin Bieber",
        channelID: "UCIwFjwMjI0y7PDBVEO9-bkQ",
        url: "https://www.youtube.com/channel/UCIwFjwMjI0y7PDBVEO9-bkQ",
        bestAvatar: {
          url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
          width: 68,
          height: 68,
        },
        avatars: [
          {
            url: "https://yt3.ggpht.com/ytc/AMLnZu-MPl6e5QKTWlsnMr6_8DyE3GzjeRzUCxneF2itFA=s88-c-k-c0x00ffffff-no-rj",
            width: 68,
            height: 68,
          },
        ],
        ownerBadges: ["Official Artist Channel"],
        verified: true,
      },
      description: null,
      views: 28186353,
      duration: "3:32",
      uploadedAt: "6 months ago",
    },
  ];
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
    flashCardsNumber: 38,
  };
  const profiledatas = [
    {
      id: 1,
      title: "Mazza Konny",
      dateOfJoined: "Date joined: Oct 2022",
      boxLeftTitle: "Boxes",
      boxValueLeft: "4",
      profileImg: "Ellipse60.png",
      bottomTitle: "all the city with me",
      boxRightTitle: "Awareness",
      boxValueRight: "15",
      blockIcon: "block.svg",
      UnBlockIcon: "unBlock.svg",
      deleteIcon: "delete.svg",
    },
    {
      id: 2,
      title: "Mazza Konny",
      dateOfJoined: "Date joined: Oct 2022",
      boxLeftTitle: "Boxes",
      boxValueLeft: "4",
      profileImg: "Ellipse60.png",
      bottomTitle: "all the city with me",
      boxRightTitle: "Awareness",
      boxValueRight: "15",
      blockIcon: "block.svg",
      UnBlockIcon: "unBlock.svg",
      deleteIcon: "delete.svg",
    },
    {
      id: 3,
      title: "Mazza Konny",
      dateOfJoined: "Date joined: Oct 2022",
      boxLeftTitle: "Boxes",
      boxValueLeft: "4",
      profileImg: "Ellipse60.png",
      bottomTitle: "all the city with me",
      boxRightTitle: "Awareness",
      boxValueRight: "15",
      blockIcon: "block.svg",
      UnBlockIcon: "unBlock.svg",
      deleteIcon: "delete.svg",
    },
    {
      id: 4,
      title: "Mazza Konny",
      dateOfJoined: "Date joined: Oct 2022",
      boxLeftTitle: "Boxes",
      boxValueLeft: "4",
      profileImg: "Ellipse60.png",
      bottomTitle: "all the city with me",
      boxRightTitle: "Awareness",
      boxValueRight: "15",
      blockIcon: "block.svg",
      UnBlockIcon: "unBlock.svg",
      deleteIcon: "delete.svg",
    },
  ];
  const flashCardModalData = {
    //title:["hello"],
    headerIcon: ["deleteFlash.svg", "edit.svg"],
    footer: ["save", "Reveal answer", "Delete"],
    textbox: [
      { header: "Front", box: "" },
      { header: "Back", box: "" },
    ],
  };

  return (
    <>
      <div className="profile-main">
        <ProfileCard
          className="pt-2"
          profile={profiledata}
          setModal2Open={setModal2Open}
        />
        {/* <div className="py-4"> */}
        <div className="m-0 pb-2 overflow-x-scroll">
          <HeaderTitle
            title="Your builds"
            className="title-list-of-profile py-2 my-2"
          />
          <div className="builds-Main overflow-auto">
            <div className="d-flex overflow-auto">
              {videosData.length > 0 &&
                videosData.map((videoData, index) => (
                  <Col md={4} className="videoProfile px-2" key={index}>
                    {/* <Link href={`/newBuild?id=${videoData.id}`}>
                      <a>
                        <VideoCard VideoCardData={videoData} />
                      </a>
                    </Link> */}
                  </Col>
                ))}
            </div>
          </div>
        </div>
        {/* </div> */}
        <div className="pb-2">
          <HeaderTitle
            title="Builds you have interacted with"
            className="title-list-of-profile py-2 my-2"
          />
          <Row className="m-0">
            {videosData.length > 0 &&
              videosData.map((videoData, index) => (
                <Col md={4} key={index} className="videoProfile">
                  {/* <Link href={`/newBuild?id=${videoData.id}`}>
                    <a>
                      <VideoCard VideoCardData={videoData} />
                    </a>
                  </Link> */}
                </Col>
              ))}
          </Row>
        </div>
        <div className="pb-2">
          <HeaderTitle
            title="Total list of Profiles"
            className="title-list-of-profile py-2 mt-4 mb-3"
          />
          <Row className="m-0">
            {profiledatas.length > 0 &&
              profiledatas.map((profiledatas, index) => (
                <Col md={3} key={index}>
                  <ProfileCard className="AllProfile" profile={profiledatas} />
                </Col>
              ))}
          </Row>
        </div>
      </div>

      <FlashCardModal
        modal2Open={modal2Open}
        flashCard={flashCardModalData}
        setModal2Open={setModal2Open}
        visible={modal2Open}
      />
    </>
  );
};

export default Profile;
