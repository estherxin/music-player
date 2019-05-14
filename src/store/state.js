//state奥
//我们需要什么呢？
//播放与否，播放模式，播放列表（有序和无序，
//播放歌曲的Index,音乐时长，播放器全屏与否，
import {playMode} from 'common/js/config'
const state = {
	singer: {},
	playing: false,
	fullScreen: false,
	playlist: [],
	sequenceList: [],
	mode: playMode.sequence,
	currentIndex: -1,
}
export default state