import AddFlashCardModal from "@/components/AddFlashCardModal";
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
  const [modal1Open, setModal1Open] = useState(false);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getVideoCard());
  // });
  const role = "user"
  const videosData = [
  
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
  const [revealAns, setRevealAns] = useState(false);
  const [modal3Open, setModal3Open] = useState({});
  const [modal4Open, setModal4Open] = useState(false);
  const flashCardArr = [
    { id: 1, question: "how are you?", answer: "fine", user_id: 1 },
    {
      id: 2,
      question: "where do you live?",
      answer: "Ahmadabad",
      user_id: 1,
    },
    { id: 3, question: "are you working?", answer: "yes", user_id: 2 },
    { id: 4, question: "can you hear us?", answer: "no", user_id: 2 },
  ];
  const userArr = [
    { id: 1, name: "AL" },
    { id: 2, name: "AC" },
  ];

  const questionData = (userId: any, index?: number, questionId?: number) => {
    const filterArray = flashCardArr.filter((F: any) => F.user_id == userId);
    const findLastValue = filterArray.slice(-1)[0];
    const lastQuestionId = findLastValue.id;

    if (questionId == lastQuestionId) {
      setModal3Open({
        content: "Congratulations! You have finished your deck",
        footer: [],
        onOk: modal4Open,
      });
      setRevealAns(true);
    } else {
      setModal3Open({
        content: index ? filterArray[index].question : filterArray[0].question,
        footer: ["Reveal Answer"],
        userId: index ? filterArray[index].user_id : filterArray[0].user_id,
        questionId: index ? filterArray[index].id : filterArray[0].id,
        index: index ? index + 1 : 1,
        arrayLength: filterArray.length,
        onOk: modal4Open,
      });
      setRevealAns(true);
    }
  };

  return (
    <>
      <div className="profile-main">
        <ProfileCard
          className="pt-2"
          profile={profiledata}
          // setModal2Open={ 
          //   questionData()
          // }
          
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
                    <Link href={`/newBuild?id=${videoData.id}`}>
                      <a>
                        <VideoCard VideoCardData={videoData} />
                      </a>
                    </Link>
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
                  <Link href={`/newBuild?id=${videoData.id}`}>
                    <a>
                      <VideoCard VideoCardData={videoData} />
                    </a>
                  </Link>
                </Col>
              ))}
          </Row>
        </div>
        {role == 'admin' ?(
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
        ):[]}
      </div>

      <FlashCardModal
        modal={revealAns}
        flashCard={modal3Open}
        setmodalOpen={setRevealAns}
        modalVisible={revealAns}
        responseCallback={(
          data: any,
          userId: number,
          questionId: number,
          index: number,
          arrayLength: number
        ) => {
          const filterArray = flashCardArr.filter((F) => F.user_id == userId);
          const questionFilter = filterArray.filter((F) => F.id == questionId);
          questionFilter.length > 0 &&
            questionFilter.map((ans) => {
              const newData = {
                content: ans.answer,
                footer: ["Again", "Hard", "Good", "Easy"],
                onOk: modal4Open,
                userId: userId,
                questionId: questionId,
                index: index,
                arrayLength: arrayLength,
              };
              setModal3Open(newData);
            });
        }}
        questionCallback={(
          userId: number,
          index: number,
          questionId: number
        ) => {
          questionData(userId, index, questionId);
        }}
      />
    </>
  );
};

export default Profile;
