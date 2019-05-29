/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service.impl;

import com.lb.lbstore.dao.RuKuDao;
import com.lb.lbstore.domain.RuKu;
import com.lb.lbstore.domain.RuKuFei;
import com.lb.lbstore.domain.RuKu;
import com.lb.lbstore.domain.RuKuDetail;
import com.lb.lbstore.service.RuKuService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Administrator
 */
@Service("ruKuServiceImpl")
public class RuKuServiceImpl implements RuKuService {

    @Autowired
    private RuKuDao ruKuDao;

    @Override
    public RuKu getRuKuById(Integer id) {
        return (RuKu) ruKuDao.findObjectById(RuKu.class, id);
    }
    
    @Override
    public RuKu getRuKuWithDetailById(Integer id) {
        return  ruKuDao.getRuKuWithDetailById(id);
    }
    
    @Override
    public RuKuDetail getRuKuDetailById(Integer id) {
        return  ruKuDao.getRuKuDetailById(id);
    }

    @Override
    public List<RuKu> getAllRuKus(Integer qy_id) {
        return ruKuDao.getResult("from RuKu ruKu where qy_id="+qy_id, null);
    }

    @Override
    public boolean updateRuKu(RuKu ruKu) {
        return ruKuDao.updateRuKu(ruKu);
    }

    @Override
    public RuKu saveRuKu(RuKu ruKu) {
        int id = ruKuDao.saveRuKu(ruKu);
        return (RuKu) ruKuDao.findObjectById(RuKu.class, id);
    }

    @Override
    public boolean deleteRuKu(Integer id) {
        return ruKuDao.deleteRuKu(id);
    }

    @Override
    public int queryRows(HashMap map) {
        String sql = "select count(1) from RuKu where qy_id="+map.get("qy_id");
        if (map.containsKey("ck_id")) {
            sql += " and ck_id = " + map.get("ck_id");
        }
        if (map.containsKey("wz")) {
            sql += " and wz like '%" + map.get("wz") + "%'";
        }
        if (map.containsKey("state")) {
            sql += " and state = " + map.get("state");
        }
        if (map.containsKey("kh_id")) {
            sql += " and kh_id = " + map.get("kh_id");
        }
        if (map.containsKey("gys_id")) {
            sql += " and gys_id = " + map.get("gys_id");
        }
        if (map.containsKey("qrq")) {
            sql += " and sj >= '" + map.get("qrq") + "'";
        }
        if (map.containsKey("zrq")) {
            sql += " and sj <= '" + map.get("zrq") + " 23:59:59'";
        }
        return ruKuDao.getCount(sql, null);
    }

    @Override
    public List<RuKu> queryRuKusByPage(HashMap map) {
        return ruKuDao.queryRuKusByPage(map);
    }

    @Override
    public boolean dealRuKu(RuKu ruKu,Integer a01_id) {
        return ruKuDao.dealRuKu(ruKu, a01_id);
    }

    @Override
    public List<RuKuDetail> getRuKuByWzid_100(Integer wzzd_id) {
        return ruKuDao.queryRuKuDetailTop100(wzzd_id);
    }
    
    @Override
    public int queryFeiRows(HashMap map) {
        String sql = "select count(1) from RuKuFei where rk_id="+map.get("rk_id");
        return ruKuDao.getCount(sql, null);
    }

    @Override
    public List<RuKuFei> queryRuKuFeisByPage(HashMap map) {
        return ruKuDao.queryRuKuFeisByPage(map);
    }

    @Override
    public RuKuFei getRuKuFeiById(Integer id) {
        return (RuKuFei) ruKuDao.findObjectById(RuKuFei.class, id);
    }

    @Override
    public boolean updateRuKuFei(RuKuFei ruKuFei) {
        return ruKuDao.updateRuKuFei(ruKuFei);
    }

    @Override
    public RuKuFei saveRuKuFei(RuKuFei ruKuFei) {
        int id = ruKuDao.saveRuKuFei(ruKuFei);
        return (RuKuFei) ruKuDao.findObjectById(RuKuFei.class, id);
    }

    @Override
    public boolean deleteRuKuFei(Integer id,Integer rk_id) {
        return ruKuDao.deleteRuKuFei(id, rk_id);
    }
    
    @Override
    public List<RuKuDetail> getRuKuDetailTop100(RuKuDetail detail) {
        return ruKuDao.queryRuKuDetailsTop100(detail);
    }

}
