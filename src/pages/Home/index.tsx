import Konva from 'konva';
import { useEffect, useRef } from 'react';

const HomePage: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  // 创建比例尺函数
  const createScale = (layer, scaleFactor, length, position) => {
    const scaleLine = new Konva.Line({
      points: [0, 0, length, 0],
      stroke: 'black',
      strokeWidth: 2,
      x: position.x,
      y: position.y,
    });

    // 创建刻度标记
    for (let i = 0; i <= length; i += scaleFactor) {
      const tick = new Konva.Line({
        points: [-4, 0, 4, 0],
        stroke: 'black',
        strokeWidth: 2,
        x: i + position.x,
        y: position.y,
      });
      layer.add(tick);
    }

    layer.add(scaleLine);
  };

  useEffect(() => {
    if (ref.current === null) {
      return;
    }

    // const clientRect = ref.current.getBoundingClientRect();
    // 初始化舞台
    const stage = new Konva.Stage({
      container: 'sketch-canvas-container',
      // width: clientRect.width,
      // height: clientRect.height
      width: 1024,
      height: 960,
    });

    // 添加图层
    const layer = new Konva.Layer();
    stage.add(layer);

    // 设置比例因子、长度和位置
    const scaleFactor = 50; // 每个刻度代表的实际单位
    const scaleLength = 300; // 比例尺的总长度
    const scalePosition = { x: 50, y: 50 }; // 比例尺的位置

    // 创建比例尺并添加到图层
    createScale(layer, scaleFactor, scaleLength, scalePosition);

    // 渲染图层
    layer.draw();
  }, []);

  return (
    <div
      ref={ref}
      id="sketch-canvas-container"
      className="w-full h-[calc(100%)] flex border"
    ></div>
  );
};

export default HomePage;
