/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.dao;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.lb.lbstore.domain.KuCun;
import com.lb.lbstore.domain.FaHuo;
import com.lb.lbstore.domain.FaHuoDetail;
import com.lb.lbstore.domain.FaHuoFei;
import com.lb.lbstore.util.LshUtil;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.stereotype.Repository;

@Repository
public class FaHuoDao extends BaseDao {

    public FaHuo getFaHuoWithDetailById(Integer id) {
        FaHuo faHuo = null;
        Session session = null;
        try {
            session = getSessionFactory().openSession();
            String sql = "select {fh.*},kh.mc as khmc,ck.mc as ckmc,a01.mc as fhrmc,a02.mc as sprmc from FaHuo fh "
                    + "left join CangKu ck on fh.ck_id=ck.id "
                    + "left join KeHu kh on fh.kh_id=kh.id "
                    + "left join A01 a01 on fh.fhr_id=a01.id "
                    + "left join A01 a02 on fh.spr_id=a02.id "
                    + "where fh.id=?";
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            navtiveSQL.setParameter(0, id);
            navtiveSQL.addEntity("fh", FaHuo.class)
                    .addScalar("khmc", StandardBasicTypes.STRING)
                    .addScalar("ckmc", StandardBasicTypes.STRING)
                    .addScalar("fhrmc", StandardBasicTypes.STRING)
                    .addScalar("sprmc", StandardBasicTypes.STRING);
            List list = navtiveSQL.list();
            List<FaHuo> list_fh = new ArrayList();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                FaHuo fh = (FaHuo) objs[0];
                String khmc = (String) objs[1];
                String ckmc = (String) objs[2];
                String fhrmc = (String) objs[3];
                String sprmc = (String) objs[4];
                fh.setKhmc(khmc);
                fh.setCkmc(ckmc);
                fh.setFhrmc(fhrmc);
                fh.setSprmc(sprmc);
                list_fh.add(fh);
            }
            if (list_fh.isEmpty()) {
                return null;
            }
            faHuo = list_fh.get(0);

            String sql_d = "select {d.*},l.mc as wzlb from FaHuoDetail d left join WuZiLeiBie l on d.wzlb_id=l.id where d.fh_id=?";
            SQLQuery navtiveSQL_d = session.createSQLQuery(sql_d);
            navtiveSQL_d.setParameter(0, id);
            navtiveSQL_d.addEntity("d", FaHuoDetail.class).addScalar("wzlb", StandardBasicTypes.STRING);
            List<FaHuoDetail> details = new ArrayList();
            List list_d = navtiveSQL_d.list();
            for (Object obj : list_d) {
                Object[] objs = (Object[]) obj;
                FaHuoDetail fhd = (FaHuoDetail) objs[0];
                String wzlb = (String) objs[1];
                fhd.setWzlb(wzlb);
                details.add(fhd);
            }
            faHuo.setDetails(details);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (session != null) {
                    session.close();
                }
            } catch (Exception he) {
                he.printStackTrace();
            }
        }
        return faHuo;
    }

    public List<FaHuo> queryFaHuosByPage(HashMap map) {
        List<FaHuo> result = new ArrayList();
        Session session = null;
        try {
            List parameters = new ArrayList();
            parameters.add(map.get("qy_id"));
            session = getSessionFactory().openSession();
            String sql = "select {fh.*},kh.mc as khmc,ck.mc as ckmc from FaHuo fh "
                    + "left join CangKu ck on fh.ck_id=ck.id left join KeHu kh on fh.kh_id=kh.id "
                    + "where fh.qy_id=?";
            if (map.containsKey("ck_id")) {
                sql += " and fh.ck_id = ?";
                parameters.add(map.get("ck_id"));
            }
            if (map.containsKey("lsh")) {
                sql += " and fh.lsh like ?";
                parameters.add("%" + map.get("lsh") + "%");
            }
            if (map.containsKey("wz")) {
                sql += " and fh.wz like ?";
                parameters.add("%" + map.get("wz") + "%");
            }
            if (map.containsKey("state")) {
                sql += " and fh.state = ?";
                parameters.add(map.get("state"));
            }
            if (map.containsKey("kh_id")) {
                sql += " and fh.kh_id = ?";
                parameters.add(map.get("kh_id"));
            }
            if (map.containsKey("gys_id")) {
                sql += " and fh.gys_id = ?";
                parameters.add(map.get("gys_id"));
            }
            if (map.containsKey("qrq")) {
                sql += " and fh.sj >= ?";
                parameters.add(map.get("qrq"));
            }
            if (map.containsKey("zrq")) {
                sql += " and fh.sj <= ?";
                parameters.add(map.get("zrq") + " 23:59:59");
            }
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            for (int i = 0; i < parameters.size(); i++) {
                navtiveSQL.setParameter(i, parameters.get(i));
            }
            navtiveSQL.addEntity("fh", FaHuo.class).addScalar("khmc", StandardBasicTypes.STRING).addScalar("ckmc", StandardBasicTypes.STRING);
            navtiveSQL.setFirstResult(Integer.parseInt(map.get("beginRow").toString()));
            navtiveSQL.setMaxResults(Integer.parseInt(map.get("pageSize").toString()));
            List list = navtiveSQL.list();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                FaHuo fh = (FaHuo) objs[0];
                String khmc = (String) objs[1];
                String ckmc = (String) objs[2];
                fh.setKhmc(khmc);
                fh.setCkmc(ckmc);
                result.add(fh);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (session != null) {
                    session.close();
                }
            } catch (Exception he) {
                he.printStackTrace();
            }
        }
        return result;
    }

    public List<FaHuoFei> queryFaHuoFeisByPage(HashMap map) {
        List<FaHuoFei> result = new ArrayList();
        Session session = null;
        try {
            session = getSessionFactory().openSession();
            String sql = "select {fhf.*},a01.mc as skrmc from FaHuoFei fhf "
                    + "left join A01 a01 on fhf.skr_id=a01.id "
                    + "where fhf.fh_id=?";
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            navtiveSQL.setParameter(0, map.get("fh_id"));
            navtiveSQL.addEntity("fhf", FaHuoFei.class).addScalar("skrmc", StandardBasicTypes.STRING);
            navtiveSQL.setFirstResult(Integer.parseInt(map.get("beginRow").toString()));
            navtiveSQL.setMaxResults(Integer.parseInt(map.get("pageSize").toString()));
            List list = navtiveSQL.list();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                FaHuoFei fhf = (FaHuoFei) objs[0];
                String skrmc = (String) objs[1];
                fhf.setSkrmc(skrmc);
                result.add(fhf);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (session != null) {
                    session.close();
                }
            } catch (Exception he) {
                he.printStackTrace();
            }
        }
        return result;
    }

    public Integer saveFaHuo(FaHuo faHuo) {
        Integer result = -1;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            faHuo.setDfje(faHuo.getJe() - faHuo.getYfje());
            Integer id = (Integer) session.save(faHuo);
            session.flush();
            for (FaHuoDetail detail : faHuo.getDetails()) {
                detail.setCk_id(faHuo.getCk_id());
                detail.setKh_id(faHuo.getKh_id());
                detail.setQy_id(faHuo.getQy_id());
                detail.setFh_id(id);
                detail.setDh(faHuo.getDh());
                if ("pt".equals(detail.getJlfs())) {
                    detail.setFhzl(detail.getFhl());
                }
                session.save(detail);
            }
            session.flush();
            tx.commit();
            result = id;
        } catch (Exception e) {
            tx.rollback();
            e.printStackTrace();
        } finally {
            try {
                if (session != null) {
                    session.close();
                }
            } catch (Exception he) {
                he.printStackTrace();
            }
        }
        return result;
    }

    public boolean updateFaHuo(FaHuo faHuo) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            faHuo.setDfje(faHuo.getJe() - faHuo.getYfje());
            session.update(faHuo);
            session.flush();
            String deleteDetail = "delete from FaHuoDetail where fh_id=?";
            session.createSQLQuery(deleteDetail).setParameter(0, faHuo.getId()).executeUpdate();
            session.flush();
            for (FaHuoDetail detail : faHuo.getDetails()) {
                detail.setCk_id(faHuo.getCk_id());
                detail.setKh_id(faHuo.getKh_id());
                detail.setQy_id(faHuo.getQy_id());
                detail.setFh_id(faHuo.getId());
                session.save(detail);
            }
            session.flush();
            tx.commit();
            result = true;
        } catch (Exception e) {
            tx.rollback();
            e.printStackTrace();
        } finally {
            try {
                if (session != null) {
                    session.close();
                }
            } catch (Exception he) {
                he.printStackTrace();
            }
        }
        return result;
    }

    public boolean deleteFaHuo(Integer id) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            String deleteDetail = "delete from FaHuoDetail where fh_id=?";
            session.createSQLQuery(deleteDetail).setParameter(0, id).executeUpdate();
            String deleteFei = "delete from FaHuoFei where fh_id=?";
            session.createSQLQuery(deleteFei).setParameter(0, id).executeUpdate();
            String deleteFh = "delete from FaHuo where id=?";
            session.createSQLQuery(deleteFh).setParameter(0, id).executeUpdate();
            session.flush();
            tx.commit();
            result = true;
        } catch (Exception e) {
            tx.rollback();
            e.printStackTrace();
        } finally {
            try {
                if (session != null) {
                    session.close();
                }
            } catch (Exception he) {
                he.printStackTrace();
            }
        }
        return result;
    }

    public boolean dealFaHuo(FaHuo faHuo, Integer a01_id) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            String sql = "from FaHuoDetail where fh_id=?";
            //List<FaHuoDetail> list = session.createQuery(sql).setParameter(0, faHuo.getId()).list();
            Hashtable<Integer, FaHuoDetail> detailTable = new Hashtable();
            StringBuilder sb = new StringBuilder();
            sb.append("(-1");
            for (FaHuoDetail e : faHuo.getDetails()) {
                detailTable.put(e.getKc_id(), e);
                sb.append(",");
                sb.append(e.getKc_id());
            }
            sb.append(")");
            String kcSql = "from KuCun where id in " + sb.toString();
            List<KuCun> kcList = session.createQuery(kcSql).list();
            for (KuCun kc : kcList) {
                FaHuoDetail detail = detailTable.get(kc.getId());
                if (detail != null) {
                    if (kc.getSyzl() < detail.getFhzl()) {
                        tx.rollback();
                        result = false;
                        return result;
                    }
                    kc.setSyzl(kc.getSyzl() - detail.getFhzl());
                    kc.setSyl(kc.getSyl() - detail.getFhl());
                    if (detail.getDymx() != null && !"".equals(detail.getDymx())) {
                        JSONArray detailDymx = JSONArray.parseArray(detail.getDymx());
                        JSONArray kcDymx = JSONArray.parseArray(kc.getDymx());
                        List<Integer> dxIds = new ArrayList();
                        for (int i = 0; i < detailDymx.size(); i++) {
                            JSONObject d = detailDymx.getJSONObject(i); // 遍历 jsonarray 数组，把每一个对象转成 json 对象
                            dxIds.add(d.getIntValue("id"));
                        }
                        for (int i = 0; i < kcDymx.size(); i++) {
                            JSONObject k = kcDymx.getJSONObject(i); // 遍历 jsonarray 数组，把每一个对象转成 json 对象
                            int id = k.getIntValue("id");
                            if (dxIds.contains(id)) {
                                k.remove("state");
                                k.put("state", 1);
                            }
                        }
                        System.out.println(kcDymx.toJSONString());
                        kc.setDymx(kcDymx.toJSONString());
                    }
                    //处理库存
                    session.save(kc);
                }
            }
            session.flush();
            faHuo = (FaHuo) session.load(FaHuo.class, faHuo.getId());
            faHuo.setState(1);
            faHuo.setSpr_id(a01_id);
            faHuo.setSpsj(new Date());
            faHuo.setLsh(LshUtil.getFhdLsh());
            faHuo.setDfje(faHuo.getJe() - faHuo.getYfje());
            session.update(faHuo);
            session.flush();
            tx.commit();
            result = true;
        } catch (Exception e) {
            tx.rollback();
            e.printStackTrace();
        } finally {
            try {
                if (session != null) {
                    session.close();
                }
            } catch (Exception he) {
                he.printStackTrace();
            }
        }
        return result;
    }

    public boolean deleteFaHuoFei(Integer id, Integer fh_id) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            String deleteFei = "delete from FaHuoFei where id=?";
            session.createSQLQuery(deleteFei).setParameter(0, id).executeUpdate();
            session.flush();
            String updateFaHuo = "update fahuo set yfje = ifnull((select sum(ifnull(f.je,0)) from fahuofei f where f.fh_id = ?),0) where fahuo.id=?";
            session.createSQLQuery(updateFaHuo).setParameter(0, fh_id).setParameter(1, fh_id).executeUpdate();
            session.flush();
            updateFaHuo = "update fahuo set dfje = je - yfje where id=?";
            session.createSQLQuery(updateFaHuo).setParameter(0, fh_id).executeUpdate();
            session.flush();
            tx.commit();
            result = true;
        } catch (Exception e) {
            tx.rollback();
            e.printStackTrace();
        } finally {
            try {
                if (session != null) {
                    session.close();
                }
            } catch (Exception he) {
                he.printStackTrace();
            }
        }
        return result;
    }

    public Integer saveFaHuoFei(FaHuoFei faHuoFei) {
        Integer result = -1;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            Integer id = (Integer) session.save(faHuoFei);
            session.flush();
            int fh_id = faHuoFei.getFh_id();
            String updateFaHuo = "update fahuo set yfje = ifnull((select sum(ifnull(f.je,0)) from fahuofei f where f.fh_id = ?),0) where fahuo.id=?";
            session.createSQLQuery(updateFaHuo).setParameter(0, fh_id).setParameter(1, fh_id).executeUpdate();
            session.flush();
            updateFaHuo = "update fahuo set dfje = je - yfje where id=?";
            session.createSQLQuery(updateFaHuo).setParameter(0, fh_id).executeUpdate();
            session.flush();
            tx.commit();
            result = id;
        } catch (Exception e) {
            tx.rollback();
            e.printStackTrace();
        } finally {
            try {
                if (session != null) {
                    session.close();
                }
            } catch (Exception he) {
                he.printStackTrace();
            }
        }
        return result;
    }

    public boolean updateFaHuoFei(FaHuoFei faHuoFei) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            session.update(faHuoFei);
            session.flush();
            int fh_id = faHuoFei.getFh_id();
            String updateFaHuo = "update fahuo set yfje = ifnull((select sum(ifnull(f.je,0)) from fahuofei f where f.fh_id = ?),0) where fahuo.id=?";
            session.createSQLQuery(updateFaHuo).setParameter(0, fh_id).setParameter(1, fh_id).executeUpdate();
            session.flush();
            updateFaHuo = "update fahuo set dfje = je - yfje where id=?";
            session.createSQLQuery(updateFaHuo).setParameter(0, fh_id).executeUpdate();
            session.flush();
            tx.commit();
            result = true;
        } catch (Exception e) {
            tx.rollback();
            e.printStackTrace();
        } finally {
            try {
                if (session != null) {
                    session.close();
                }
            } catch (Exception he) {
                he.printStackTrace();
            }
        }
        return result;
    }

    public FaHuoDetail getFaHuoDetailById(Integer id) {
        FaHuoDetail faHuoDetail = null;
        Session session = null;
        try {
            session = getSessionFactory().openSession();
            String sql = "select {fhd.*},kh.mc as khmc,ck.mc as ckmc,fh.spsj as sj,fh.lsh as lsh,a01.mc as fhrmc,l.mc as wzlb from FaHuoDetail fhd "
                    + "left join FaHuo fh on fhd.fh_id=fh.id "
                    + "left join CangKu ck on fhd.ck_id=ck.id "
                    + "left join KeHu kh on fh.kh_id=kh.id "
                    + "left join A01 a01 on fh.fhr_id=a01.id "
                    + "left join WuZiLeiBie l on fhd.wzlb_id=l.id "
                    + "where fhd.id=?";
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            navtiveSQL.setParameter(0, id);
            navtiveSQL.addEntity("fhd", FaHuoDetail.class)
                    .addScalar("khmc", StandardBasicTypes.STRING)
                    .addScalar("ckmc", StandardBasicTypes.STRING)
                    .addScalar("sj", StandardBasicTypes.DATE)
                    .addScalar("lsh", StandardBasicTypes.STRING)
                    .addScalar("fhrmc", StandardBasicTypes.STRING)
                    .addScalar("wzlb", StandardBasicTypes.STRING);
            List list = navtiveSQL.list();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                faHuoDetail = (FaHuoDetail) objs[0];
                String khmc = (String) objs[1];
                String ckmc = (String) objs[2];
                Date sj = (Date) objs[3];
                String lsh = (String) objs[4];
                String fhrmc = (String) objs[5];
                String wzlb = (String) objs[6];
                faHuoDetail.setKhmc(khmc);
                faHuoDetail.setCkmc(ckmc);
                faHuoDetail.setSj(sj);
                faHuoDetail.setLsh(lsh);
                faHuoDetail.setFhrmc(fhrmc);
                faHuoDetail.setWzlb(wzlb);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (session != null) {
                    session.close();
                }
            } catch (Exception he) {
                he.printStackTrace();
            }
        }
        return faHuoDetail;
    }

    public List<FaHuoDetail> queryFaHuoDetailsTop100(FaHuoDetail detail) {
        List<FaHuoDetail> result = new ArrayList();
        Session session = null;
        try {
            List parameters = new ArrayList();
            parameters.add(detail.getQy_id());
            session = getSessionFactory().openSession();
            String sql = "select {fhd.*},kh.mc as khmc,ck.mc as ckmc,fh.spsj as sj,fh.lsh as lsh,a01.mc as fhrmc,l.mc as wzlb from FaHuoDetail fhd "
                    + "left join FaHuo fh on fhd.fh_id=fh.id "
                    + "left join CangKu ck on fhd.ck_id=ck.id "
                    + "left join KeHu kh on fh.kh_id=kh.id "
                    + "left join A01 a01 on fh.fhr_id=a01.id "
                    + "left join WuZiLeiBie l on fhd.wzlb_id=l.id "
                    + "where fh.qy_id=?";
            if (detail.getLsh() != null && !"".equals(detail.getLsh())) {
                sql += " and fh.lsh = ?";
                parameters.add(detail.getLsh());
            }
            if (detail.getCk_id() != null) {
                sql += " and fhd.ck_id = ?";
                parameters.add(detail.getCk_id());
            }
            if (detail.getWzlb_id() != null) {
                sql += " and fhd.wzlb_id = ?";
                parameters.add(detail.getWzlb_id());
            }
            if (detail.getWzmc() != null && !"".equals(detail.getWzmc())) {
                sql += " and fhd.wzmc = ?";
                parameters.add(detail.getWzmc());
            }
            if (detail.getXhgg() != null && !"".equals(detail.getXhgg())) {
                sql += " and fhd.xhgg = ?";
                parameters.add(detail.getXhgg());
            }
            if (detail.getKh_id() != null) {
                sql += " and fhd.kh_id = ?";
                parameters.add(detail.getKh_id());
            }
            if (detail.getGys_id() != null) {
                sql += " and fhd.ck_id = ?";
                parameters.add(detail.getGys_id());
            }
            if (detail.getFhr_id() != null) {
                sql += " and fh.fhr_id = ?";
                parameters.add(detail.getFhr_id());
            }
            if (detail.getTxm() != null && !"".equals(detail.getTxm())) {
                sql += " and fhd.txm = ?";
                parameters.add(detail.getTxm());
            }
            if (detail.getQrq() != null && !"".equals(detail.getQrq())) {
                sql += " and fh.spsj >= ?";
                parameters.add(detail.getQrq());
            }
            if (detail.getZrq() != null && !"".equals(detail.getZrq())) {
                sql += " and fh.spsj <= ?";
                parameters.add(detail.getZrq() + " 23:59:59");
            }
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            for (int i = 0; i < parameters.size(); i++) {
                navtiveSQL.setParameter(i, parameters.get(i));
            }
            navtiveSQL.addEntity("fhd", FaHuoDetail.class)
                    .addScalar("khmc", StandardBasicTypes.STRING)
                    .addScalar("ckmc", StandardBasicTypes.STRING)
                    .addScalar("sj", StandardBasicTypes.DATE)
                    .addScalar("lsh", StandardBasicTypes.STRING)
                    .addScalar("fhrmc", StandardBasicTypes.STRING)
                    .addScalar("wzlb", StandardBasicTypes.STRING);
            List list = navtiveSQL.list();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                FaHuoDetail fhd = (FaHuoDetail) objs[0];
                String khmc = (String) objs[1];
                String ckmc = (String) objs[2];
                Date sj = (Date) objs[3];
                String lsh = (String) objs[4];
                String fhrmc = (String) objs[5];
                String wzlb = (String) objs[6];
                fhd.setKhmc(khmc);
                fhd.setCkmc(ckmc);
                fhd.setSj(sj);
                fhd.setLsh(lsh);
                fhd.setFhrmc(fhrmc);
                fhd.setWzlb(wzlb);
                result.add(fhd);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (session != null) {
                    session.close();
                }
            } catch (Exception he) {
                he.printStackTrace();
            }
        }
        return result;
    }
}
