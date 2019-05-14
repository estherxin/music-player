import 'babel-polyfill'
import 'common/js/hack'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'

import 'common/stylus/index.styl' 
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
	loading: require('common/image/default.png')
})
import store from './store'
/*
import { SET_PLAY_HISTORY, SET_FAVORITE_LIST } from './store/mutation-types'
import { loadPlay, loadFavorite } from 'common/js/cache'
import { processSongsUrl } from 'common/js/song'
*/

/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole'
/*


Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})

const historySongs = loadPlay()
processSongsUrl(historySongs).then((songs) => {
  store.commit(SET_PLAY_HISTORY, songs)
})

const favoriteSongs = loadFavorite()
processSongsUrl(favoriteSongs).then((songs) => {
  store.commit(SET_FAVORITE_LIST, songs)
})
*/
/* eslint-disable no-new */
fastclick.attach(document.body)

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
/*

1.1. 不要试图掌握所有的相关数学知识再开始学习在很多相关的回答中，
我都一再强调不要试图补足数学知识再开始学习机器学习。
一般来说，大部分机器学习课程/书籍都要求：
线性代数：
矩阵/张量乘法、求逆，奇异值分解/特征值分解，行列式，范数等
统计与概率：
概率分布，独立性与贝叶斯，最大似然(MLE)和最大后验估计(MAP)等
优化：线性优化，非线性优化(凸优化/非凸优化)以及其衍生的求解方法如梯度下降、
牛顿法、基因算法和模拟退火等微积分：偏微分，
链式法则，矩阵求导等信息论、
数值理论等一般人如果想要把这些知识都补全再开始机器学习往往需要很长时间，
容易半途而废。而且这些知识是工具不是目的，
我们的目标不是成为优化大师。
建议在机器学习的过程中哪里不会补哪里，这样更有目的性且耗时更低。

`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~```
在系统学习机器学习之前，你至少要掌握以下数学基础知识：
高等数学：高等数学是马上说到所有内容的基础之基础。它
的主要内容包括：函数与极限、一元微积分学、多元微积分学、
常微分方程、级数理论和空间解析几何等。
线性代数：机器在处理庞大数据时，
在算法角度上，矩阵是其处理的基本单元。
线性代数的主要内容有：矩阵与线性方程组、
行列式、特征值、二次型、线性空间和线性变换等。
概率论：
概率论是用于表示不确定性声明的数学框架。
概率论告诉机器如何推理，
据此我们设计一些算法来计算或者估算由概率论导出的表达式。
它的主要内容包括：
简单的组合计数原理、概率论公理、条件概率与独立性、
随机变量及其常见分布、
多维随机变量及其常见分布、随机变量的数字特征、
马尔可夫链、信息论基础、极限定理等。
数值计算：
上述的所有数学知识要应用到机器学习中，
需要一定的计算方法，
数值计算提供了抽象思维转化为机器思考的算法。
它的主要内容包括：
计算复杂性与误差理论、数值微分与积分、数值线性代数、
无约束问题的最优化方法、多项式插值法、蒙特卡洛模拟法等。


1. 周志华：机器学习。比较新的机器学习入门教科书。
对于机器学习领域覆盖较为全面。
2. 李航： 统计学习方法。较为简略的机器学习教材。对模型的推导很清晰。
3. 集体智慧编程 。这本书会带着你把部分机器学习算法实现出来跑一遍。
4. PRML Pattern Recognition And Machine Learning 机器学习进阶书。侧重贝叶斯。
5. MLAPP(Machine Learning: a Probabilistic Perspective) Machine Learning 机器学习进阶书。 内容较为全。
6.elements of statistical learning amazon.cn 的页面作者是超级大牛。
书也较难。侧重统计。以上书籍，
1-2中，推荐拿一本重点学习，并拿另一本做参考书，同时参考3进行算法实现。
这三本搞清楚之后再往后走。
4-6的3本都是神书，都挺难读，但深入机器学习还是需要这些。
但不做research并且不想深入的话也可以不读。到时候也可以挑一本看。个人喜欢
5.另，网络上有一些公开课，可以去找一下。
另，现在流行深度学习啥的，想要学习的话也请放到1-2之后进行。
*/