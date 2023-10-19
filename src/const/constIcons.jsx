import {
    FaUserAlt,
    FaUserTie,
    FaOpencart,
    FaPlusCircle,
    FaMinusCircle,
    FaTrashAlt,
    FaCity,
    FaMale,
    FaFemale,
    FaBirthdayCake,
    FaArrowAltCircleDown,
    FaArrowAltCircleUp,
    FaPencilAlt,
    FaCircle,
} from 'react-icons/fa';
import {
    MdMale,
    MdOutlineFemale,
    MdLock,
    MdEmail,
    MdOutlineEmail,
    MdPerson,
} from 'react-icons/md';
import {
    BsTelephone,
    BsBuilding,
    BsSuitHeartFill,
    BsSuitHeart,
    BsPersonVcard,
    BsImage
} from 'react-icons/bs'
import { BiMapPin, BiSolidMinusSquare, BiSolidPlusSquare } from 'react-icons/bi'
import { IoEarthOutline } from 'react-icons/io5'
import { LiaCitySolid } from 'react-icons/lia'
import { RiArrowLeftDoubleFill } from 'react-icons/ri'
import { TbMapPinCode } from 'react-icons/tb'

export const ICONS = {
    NIT: (fill = 'black') => { return <BsPersonVcard fill={fill} /> },
    USER: (fill = 'black') => { return <FaUserAlt fill={fill} /> },
    ADMIN: (fill = 'black') => { return <FaUserTie fill={fill} /> },
    PERSON: (fill = 'black') => { return <MdPerson fill={fill} /> },
    PHONE: (fill = 'black') => { return <BsTelephone fill={fill} /> },
    BIRTHDAY: (fill = 'black') => { return <FaBirthdayCake fill={fill} /> },
    TROLLEY: (fill = 'black') => { return <FaOpencart fill={fill} /> },
    PASSWORD: (fill = 'black') => { return <MdLock fill={fill} /> },
    MALE: (fill = 'black') => { return <MdMale fill={fill} /> },
    FEMALE: (fill = 'black') => { return <MdOutlineFemale fill={fill} /> },
    MEN_BLACK: (fill = 'black') => { return <FaMale fill={fill} /> },
    WOMEN_BLACK: (fill = 'black') => { return <FaFemale fill={fill} /> },
    E_MAIL_BLACK: (fill = 'black') => { return <MdEmail fill={fill} /> },
    E_MAIL: (fill = 'black') => { return <MdOutlineEmail fill={fill} /> },
    COUNTRY: (fill = 'black') => { return <IoEarthOutline fill={fill} /> },
    STATE: (fill = 'black') => { return <LiaCitySolid fill={fill} /> },
    CITY: (fill = 'black') => { return <FaCity fill={fill} /> },
    BUILD: (fill = 'black') => { return <BsBuilding fill={fill} /> },
    LOCATION: (fill = 'black') => { return <BiMapPin fill={fill} /> },
    ZIP_CODE: (fill = 'black') => { return <TbMapPinCode fill={fill} /> },
    FAVORITE_RED: (fill = 'red') => { return <BsSuitHeartFill fill={fill} /> },
    FAVORITE: (fill = 'black') => { return <BsSuitHeart fill={fill} /> },
    PLUS: (fill = 'black') => { return <FaPlusCircle fill={fill} /> },
    MINUS: (fill = 'black') => { return <FaMinusCircle fill={fill} /> },
    TRASH: (fill = 'black') => { return <FaTrashAlt fill={fill} /> },
    ARROW_LEFT: (fill = 'black') => { return <RiArrowLeftDoubleFill fill={fill} /> },
    IMAGE: (fill = 'black') => { return <BsImage fill={fill} /> },
    ARROW_DOWN: (fill = 'black') => { return <FaArrowAltCircleDown fill={fill} /> },
    ARROW_UP: (fill = 'black') => { return <FaArrowAltCircleUp fill={fill} /> },
    EDIT: (fill = 'black') => { return <FaPencilAlt fill={fill} /> },
    COLORS: (fill = 'white') => { return <FaCircle fill={fill} /> },
    PLUS_SQUARE: (fill = 'black') => { return <BiSolidPlusSquare fill={fill} /> },
    MINUS_SQUARE: (fill = 'black') => { return <BiSolidMinusSquare fill={fill} /> },

}